import db from '../models/index.js';

const Controller = {};
const { Connection } = db;

// user_id로 모든 친구들 다 찾아서 리턴
Controller.findAllFriends = async (user_id) => {
    const friends = await Connection.findAll({where: {"user_id_1": user_id}})
    return friends
}

// 친구들의 ID를 리턴
Controller.findAllFriendsId = async (user_id) => {
    const friends = await Connection.findAll({where: {"user_id_1": user_id}})
    const ids = friends.map((item)=>item.dataValues.user_id_2);
    return ids
}

// 나랑 얘랑 친구인지 확인
Controller.isFriend = async (user_id_1, user_id_2) => {
    const result = await Connection.findAll( {where: {
        "user_id_1" : user_id_1,
        "user_id_2" : user_id_2
    }})
    if (!result.length) {
        return false;
    }
    return true;

}


// 친구추가
Controller.connect = async (user_id_1, user_id_2) => {
    const result = await Connection.create({user_id_1, user_id_2});

    if (result) {
        return true;
    } 
        return false;
    
}

// 친구 삭제(안 됨)
Controller.disconnect = async (user_id_1, user_id_2) => {

    const row = await Connection.destroy({where: {user_id_1, user_id_2}})
    return row
    // return row? row.destroy() : false;
}


export default Controller