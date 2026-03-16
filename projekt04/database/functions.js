import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./database/database.db");

const getResult = query => new Promise((resolve, reject) => {
  db.all(query, (err, row) => {
    if (err) {
      reject(err);
    } else {
      resolve(row);
    }
  })
});

async function addUser(login, password) {
    var isError = false;
    
    try {
        await getResult(`
            INSERT INTO users
            (login, password, joinedAt)
            VALUES ('${login}', '${password}', datetime('now'));
        `);
    } catch(error) {
        isError = error;
    } finally {
        return {
            successful: isError ? false : true,
            reason: isError
        };
    };
}

async function fetchLogin(userId) {
    return await getResult(`
        SELECT login
        FROM users
        WHERE userId = ${userId};
    `);
}

async function addPost(userId, title, content) {
    db.exec(`
        INSERT INTO posts
        (userId, title, content, postedAt)
        VALUES (${userId}, '${title}', '${content}', datetime('now'));
    `);
}

async function removePost(postId) {
    db.exec(`
        DELETE FROM posts
        WHERE postId = ${postId};
    `);
}

async function fetchPosts() {
    return await getResult(`
        SELECT userId, title, content
        FROM posts;
    `);
}

async function fetchPost(postId) {
    return await getResult(`
        SELECT userId, title, content
        FROM posts
        WHERE postId = ${postId};
    `);
}

async function login(login, password) {
    if (await getResult(`
        SELECT password
        FROM users
        WHERE login = '${login}'
    `) == password) {
        console.log(`${login} successfully logged in using password ${password}!`)
        return {successful : true};
    } else {
        console.log(`Someone tried to log in but failed with credentials:
            Login: ${login}
            Password: ${password}`)

        return {successful : false};
    };
}

async function logout(login, password) {

}

async function clear() {
    db.exec("DELETE FROM users");
    db.exec("DELETE FROM posts");
}

export default {
    addPost,
    removePost,
    fetchPost,
    fetchPosts,
    fetchLogin,
    addUser,
    login,
    logout,
    clear
}