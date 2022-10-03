import {read, write} from "../utils/FS.js"
import { sing, verify } from "../utils/JSW.js"

export const userGet = (req, res) => {
    const { id } = req.params
    const findUser = read("user.json").find(e => e.id == id)
    const AllUsers = read("user.json").filter(e => e.id != id )
    const chat = read("chat.json")
    for (const i in chat) {
        for (const j in AllUsers) {
            if (chat[i].kimga == id && chat[i].kimdan == AllUsers[j].id) {
                AllUsers[j].kimdan = chat[i]
            }
            if (chat[i].kimdan == id && chat[i].kimga == AllUsers[j].id) {
                AllUsers[j].kimga = chat[i] 
            } 
        }
    }
    res.status(200).json({
        data: findUser,
        users:AllUsers,
        token: sing(id)
    })
}

export const postUser = (req, res) => {
    const { password, data } = req.body
    const findUser = read("user.json").find(e => e.password == password)
    const AllUsers = read("user.json").filter(e => e.password != password )
    const chat = read("chat.json")
    if (!findUser) {
        return res.status(400).json({token: false})
     } 
     if (!findUser.isActive) {
        return res.status(400).json({token: false})
     }
    for (const i in chat) {
        for (const j in AllUsers) {
            if (chat[i].kimga == findUser.id && chat[i].kimdan == AllUsers[j].id) {
                AllUsers[j].kimdan = chat[i]
            }
            if (chat[i].kimdan == findUser.id && chat[i].kimga == AllUsers[j].id) {
                AllUsers[j].kimga = chat[i] 
            } 
        }
    }
    findUser.isOnline = data
    const AllFindUser = read("user.json").map(e => e.id == findUser.id ? findUser : e)
    write("user.json", AllFindUser)
    res.status(200).json({
        data: findUser,
        users: AllUsers,
        token: sing({id: findUser.id})
    })
}

export const postChat = (req, res) => {
    const { id } = req.params
    const { token } = req.headers
    const tokenId = verify(token).id ? verify(token).id : verify(token)
    console.log(tokenId);
    const findUser = read("user.json").find(e => e.id == id)
    const User = read("user.json").find(e => e.id == tokenId)
    const AllChat = read("chat.json")
    const menga = AllChat.filter(e => e.kimga == tokenId && e.kimdan == id || e.kimdan == tokenId && e.kimga == id)
    for (const i in AllChat) {
        if (AllChat[i].kimga == tokenId && AllChat[i].kimdan == id) {
            AllChat[i].oqildi = true
        }
    }
    let sana = 0
    for (const i in AllChat) {
        if (AllChat[i].kimga == tokenId && AllChat[i].kimdan == id || AllChat[i].kimdan == tokenId && AllChat[i].kimga == id) {
            AllChat[i].forId = sana
            sana++
        }
    }
    write("chat.json", AllChat)
    res.status(200).json({
        findUser: findUser,
        menga, id, User 
    })
}