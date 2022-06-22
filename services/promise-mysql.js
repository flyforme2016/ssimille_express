const poolPromise = require('../config/db_config');

module.exports = {
    insertProfileImgToDb : async (...args) => {
        console.log('Enter isertImageToDb')
        const query = args[0]
        const value = [1, args[1]] //imageUrl
        const pool = await poolPromise //promise-mysql pool 생성
        const connection = await pool.getConnection()
        try {
            await connection.query(query, value);
        } catch (error) {
            //pool connection이나 connection.query가 실패할 경우 진입
            console.log('Error insertProfileImgToDb :', error)
            connection.rollback() //쿼리 실패시 혹시 수행 된 부분 작업 이전으로 되돌리기
        } finally{
            connection.release() //connection 반환
        }
        //beginTransation()을 안해줬기때문에 commit()도 할 필요 없음
    },
    initTable : async(...args) => {
        console.log('Enter initTable')
        const query1 = args[0]      //initUserTable
        const query2 = args[1]      //initUserHashTagTable
        const initTableObject = {
            kakao_user_number : args[2],
            nickname : args[3], 
            profile_image : 'https://ssimille-bucket.s3.ap-northeast-2.amazonaws.com/default/defaultProfileImg.png',
            friend_count : 0, 
            post_count : 0, 
            song_count : 0
        }
        const pool = await poolPromise
        const connection = await pool.getConnection()
        await connection.beginTransaction()
        try {
            await connection.query(query1, initTableObject) //initUserTable
            await connection.query(query2, args[2]) //initUserHashTagTable, args[2] = UID
            console.log('Success initTable')
        } catch (error) {
            console.log('Error initUserTable: ', error)
            await connection.rollback()    //일부 쿼리 실패시 성공한 쿼리까지 rollback
            connection.release()
        } finally{
            await connection.commit()      //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
            connection.release()
        }
    },
    uploadPost : async(...args) =>{
        console.log('Enter uploadPost')
        const query1 = args[0]      //insertPost
        const query2 = args[1]      //insertPostImgs
        const dateTime = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
        const insertPostObject = {
            kakao_user_number : args[2].key,
            del_ny : 0,
            region_depth1 : args[2].regionDepth1,
            address_name: args[2].addressName,
            music_uri : args[2].musicUri,
            album_title : args[2].albumTitle,
            album_image : args[2].albumImg,
            album_artist_name : args[2].albumArtistName,
            input_text : args[2].inputText,
            like_count : 0,
            reg_time : dateTime
        }
        
        const pool = await poolPromise
        const connection = await pool.getConnection()
        await connection.beginTransaction()
        try {
            await connection.query(query1, insertPostObject) //insertPost
            const result = await connection.query('SELECT LAST_INSERT_ID()');
            const postSeq = result[0]['LAST_INSERT_ID()']
            console.log('postSeq[0].LAST_INSERT_ID(): ', result[0]['LAST_INSERT_ID()'])
            const insertPostImgsObject = {
                post_seq : postSeq,
                image1 : args[2].images[0],
                image2 : args[2].images[1],
                image3 : args[2].images[2],
                image4 : args[2].images[3],
                image5 : args[2].images[4],
            }
            await connection.query(query2, insertPostImgsObject) //insertPostImgs
            console.log('Success uploadPost')
        } catch (error) {
            console.log('Error uploadPost: ', error)
            await connection.rollback()    //일부 쿼리 실패시 성공한 쿼리까지 rollback
            connection.release()
        } finally{
            await connection.commit()      //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
            connection.release()
        }
    },
    selectData : async(...args) => {
        console.log('Enter selectData')
        const query = args[0]
        const value = args[1]
        const pool = await poolPromise
        const connection = await pool.getConnection()
        try {
            const result = await connection.query(query, value)
            return result;
        } catch (error) {
            console.log('Error selectData: ', error)
            connection.rollback()
        }finally{
            console.log('Finally')
            connection.release()
        }
    },
    updateData : async(...args) => {
        console.log('Enter updateData')
        const query = args[0]
        const value = args[1]
        const pool = await poolPromise
        const connection = await pool.getConnection()
        try{
            await connection.query(query, value)
        }catch (error) {
            console.log('Error updateData :', error)
            connection.rollback() 
        } finally{
            connection.release()
        }
    },
    insertData : async(...args) => {
        console.log('Enter insertData')
        const query = args[0]
        const value = args[1]
        const pool = await poolPromise
        const connection = await pool.getConnection()
        try{
            await connection.query(query, value)
        }catch (error) {
            console.log('Error insertData :', error)
            connection.rollback() 
            connection.release()
        } finally{
            connection.release()
        }
    },
    deleteData : async(...args) => {
        console.log('Enter deleteData')
        const query = args[0]
        const value = args[1]
        const pool = await poolPromise
        const connection = await pool.getConnection()
        try{
            await connection.query(query, value)
        }catch (error) {
            console.log('Error deleteData :', error)
            connection.rollback() 
        } finally{
            connection.release()
        }
    },
    postLikeTransaction : async(...args) => {
        console.log('Enter postLikeTransaction')
        const query1 = args[0]  //insert||deletePostLikedUser
        const query2 = args[1]  //increase||decreaseLikeCount
        const value = args[2]   //[0] : postNum. [1] : key
        
        const pool = await poolPromise
        const connection = await pool.getConnection()
        await connection.beginTransaction()
        try {
            await connection.query(query1, value)       //insert||deletePostLikedUser
            await connection.query(query2, value[0])    //increase||decreaseLikeCount
            console.log('Success postLikeTransaction')
        } catch (error) {
            console.log('Error postLikeTransaction: ', error)
            await connection.rollback()    //일부 쿼리 실패시 성공한 쿼리까지 rollback
            connection.release()
        } finally{
            await connection.commit()      //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
            connection.release()
        }
    } 
}