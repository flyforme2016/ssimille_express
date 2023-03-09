const poolPromise = require("../config/db_config");

module.exports = {
  insertProfileImgToDb: async (...args) => {
    const query = args[0];
    const value = [1, args[1]]; //imageUrl
    const pool = await poolPromise; //promise-mysql pool 생성
    const connection = await pool.getConnection();
    try {
      await connection.query(query, value);
    } catch (error) {
      //pool connection이나 connection.query가 실패할 경우 진입
      connection.rollback(); //쿼리 실패시 혹시 수행 된 부분 작업 이전으로 되돌리기
    } finally {
      connection.release(); //connection 반환
    }
    //beginTransation()을 안해줬기때문에 commit()도 할 필요 없음
  },
  initTable: async (...args) => {
    const query1 = args[0]; //initUserTable
    const query2 = args[1]; //initUserHashTagTable
    const query3 = args[2]; //initGenreMatrixTable
    const initTableObject = {
      kakao_user_number: args[3],
      nickname: args[4],
      profile_image:
        "https://ssimille-bucket.s3.ap-northeast-2.amazonaws.com/default/defaultProfileImg.png",
      friend_count: 0,
      post_count: 0,
      song_count: 0,
    };
    const pool = await poolPromise;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      await connection.query(query1, initTableObject); //initUserTable
      await connection.query(query2, args[3]); //initUserHashTagTable, args[2] = UID
      await connection.query(query3, args[3]);
    } catch (error) {
      await connection.rollback(); //일부 쿼리 실패시 성공한 쿼리까지 rollback
      connection.release();
    } finally {
      await connection.commit(); //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
      connection.release();
    }
  },
  insertPost: async (...args) => {
    const query1 = args[0]; //insertPost
    const query2 = args[1]; //insertPostImgs
    const query3 = args[2]; //increasePostCount
    const dateTime = new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "");
    const insertPostObject = {
      kakao_user_number: args[3].key,
      del_ny: 0,
      region_depth1: args[3].regionDepth1,
      address_name: args[3].addressName,
      music_uri: args[3].musicUri,
      album_title: args[3].albumTitle,
      album_image: args[3].albumImg,
      album_artist_name: args[3].albumArtistName,
      input_text: args[3].inputText,
      like_count: 0,
      reg_time: dateTime,
    };

    const pool = await poolPromise;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      await connection.query(query1, insertPostObject); //insertPost
      const result = await connection.query("SELECT LAST_INSERT_ID()");
      const postSeq = result[0]["LAST_INSERT_ID()"];
      const insertPostImgsObject = {
        post_seq: postSeq,
        image1: args[3].images[0],
        image2: args[3].images[1],
        image3: args[3].images[2],
        image4: args[3].images[3],
        image5: args[3].images[4],
      };
      await connection.query(query2, insertPostImgsObject); //insertPostImgs
      await connection.query(query3, args[3].key); //increasePostCount
    } catch (error) {
      await connection.rollback(); //일부 쿼리 실패시 성공한 쿼리까지 rollback
      connection.release();
    } finally {
      await connection.commit(); //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
      connection.release();
    }
  },
  deletePost: async (...args) => {
    const query1 = args[0]; //deletePost
    const query2 = args[1]; //decreasePostCount
    const pool = await poolPromise;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      await connection.query(query1, args[2][0]); //deletePost
      await connection.query(query2, args[2][1]); //decreasePostCount
    } catch (error) {
      await connection.rollback(); //일부 쿼리 실패시 성공한 쿼리까지 rollback
      connection.release();
    } finally {
      await connection.commit(); //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
      connection.release();
    }
  },
  selectData: async (...args) => {
    const query = args[0];
    const value = args[1];
    const pool = await poolPromise;
    const connection = await pool.getConnection();
    try {
      const result = await connection.query(query, value);
      return result;
    } catch (error) {
      connection.rollback();
    } finally {
      connection.release();
    }
  },
  updateData: async (...args) => {
    const query = args[0];
    const value = args[1];
    const pool = await poolPromise;
    const connection = await pool.getConnection();
    try {
      await connection.query(query, value);
    } catch (error) {
      connection.rollback();
    } finally {
      connection.release();
    }
  },
  insertData: async (...args) => {
    const query = args[0];
    const value = args[1];
    const pool = await poolPromise;
    const connection = await pool.getConnection();
    try {
      await connection.query(query, value);
    } catch (error) {
      connection.rollback();
      connection.release();
    } finally {
      connection.release();
    }
  },
  deleteData: async (...args) => {
    const query = args[0];
    const value = args[1];
    const pool = await poolPromise;
    const connection = await pool.getConnection();
    try {
      await connection.query(query, value);
    } catch (error) {
      connection.rollback();
    } finally {
      connection.release();
    }
  },
  postLikeTransaction: async (...args) => {
    const query1 = args[0]; //insert||deletePostLikedUser
    const query2 = args[1]; //increase||decreaseLikeCount
    const value = args[2]; //[0] : postNum. [1] : key

    const pool = await poolPromise;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      await connection.query(query1, value); //insert||deletePostLikedUser
      await connection.query(query2, value[0]); //increase||decreaseLikeCount
    } catch (error) {
      await connection.rollback(); //일부 쿼리 실패시 성공한 쿼리까지 rollback
      connection.release();
    } finally {
      await connection.commit(); //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
      connection.release();
    }
  },
  updateFriend: async (...args) => {
    const query1 = args[0]; //insert/delete Friend
    const query2 = args[1]; //increase/decrease FriendCount
    const pool = await poolPromise;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      await connection.query(query1, args[2]); //args[2][0] : myUid, args[2][1] : otherUid
      await connection.query(query2, args[2][0]);
    } catch (error) {
      await connection.rollback(); //일부 쿼리 실패시 성공한 쿼리까지 rollback
      connection.release();
    } finally {
      await connection.commit(); //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
      connection.release();
    }
  },
  updateFavoriteSong: async (...args) => {
    const query1 = args[0]; //insert/delete favoriteSong
    const query2 = args[1]; //increase/decrease songCount
    const pool = await poolPromise;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      await connection.query(query1, args[2][0]); //args[2][0] : setObject|favorite_song_seq, args[2][1] : uid
      await connection.query(query2, args[2][1]);
    } catch (error) {
      await connection.rollback(); //일부 쿼리 실패시 성공한 쿼리까지 rollback
      connection.release();
    } finally {
      await connection.commit(); //tansaction이 문제 없을 시 commit에 의해 실제 transaction 수행
      connection.release();
    }
  },
};
