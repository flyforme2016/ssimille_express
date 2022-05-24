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
        const value = [args[2], args[3], 'https://ssimille-bucket.s3.ap-northeast-2.amazonaws.com/defaultProfileImg/defaultProfileImg.png', 0, 0, 0] //kakaoUserNumber, defaultProfileImgUrl, friend/post/song count
        const pool = await poolPromise
        const con = await pool.getConnection()
        await con.connection.beginTransaction()
        try {
            await con.connection.query(query1, value) //initUserTable
            await con.connection.query(query2, args[2]) //initUserHashTagTable, args[2] = UID
            console.log('Success initTable')
        } catch (error) {
            console.log('Error initUserTable: ', error)
            await con.rollback()    //일부 쿼리 실패시 성공한 쿼리까지 rollback
            con.connection.release()
        } finally{
            await con.commit()      //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
            con.connection.release()
        }
    },
    selectUserProfile : async(...args) => {
        console.log('Enter selectUserProfile')
        const query = args[0]
        const value = args[1] //key = userKakaoNumber where문의 조건으로 사용
        const pool = await poolPromise
        const connection = await pool.getConnection()   
        try {
            const result = await connection.query(query, value)
            return result;
        } catch (error) {
            console.log('Error selectUserProfile: ', error)
            connection.rollback()
        }finally{
            console.log('Finally')
            connection.release()
        }
    },
    editUserProfile : async(...args) => { //args[0] = query, args[1] = data, args[2] =hashTagArr
        console.log('Enter editUserProfile')
        const query1 = args[0] //editUserProfile
        const query2 = args[1] //updateHashTag
        const value1 = args[2] //1.nickname 2.profileImg 3.profileMusic 4.key = userKakaoNumber where문의 조건으로 사용
        const value2 = args[3] //1~5. tag_cd 6.ssi_user_kakao_user_number = where문의 조건으로 사용
        const pool = await poolPromise
        const con = await pool.getConnection()
        await con.connection.beginTransaction()
        try {
            //hashtag를 제외한 profile 데이터 update
            await connection.query(query1, value1)
            //hashtag update
            await connection.query(query2, value2)
            
        } catch (error) {
            console.log('Error editUserProfile: ', error)
            await con.rollback()    //일부 쿼리 실패시 성공한 쿼리까지 rollback
            con.connection.release()
        }finally{
            console.log('Finally')
            await con.commit()      //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
            con.connection.release()
        }
    }
}