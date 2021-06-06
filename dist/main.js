const PostBtn = $('#postButton');
const inputTextElement = $('input');
const woofer = new WooferManger();
const render = new Renderer();
var ErrMsg = "";
const userLogged = true
const LoadPage = async function () {
    if (userLogged === false) {
        render.renderLogin();
    } else {
        await woofer.creatUser();
        await woofer.getPostFromDb();
        console.log(woofer.UsersPosts)
        // const data=woofer.UsersPosts;
        render.renderFeed(woofer.UsersPosts)

    }
}

$(document).ready(async function () {
    await LoadPage()
})



const deletePost = async function () {
    var postId = prompt("What is your deletepodt id?");
    woofer.deletePostFromDB(postId)
    // render.render_data(woofer.UserPosts)

}

const saveComment = async function () {
    var myPostId = prompt("What is your deletepodt id?");
    const testcomment1 = {
        user: "comment1",
        PostId: myPostId,
        date: date,
        text: text
    }
    woofer.saveCommentInDB(newTesterComment);
    // render.render_data(woofer.UserPosts)

}




$('body').on("click", "#postButton", async function () {
    const postText = $('#postInput').val();

    if (validateInput(postText)) {
        await savePostInDB(woofer.userName, woofer.userId, postText)
        await woofer.getPostFromDb()
        render.renderFeed(woofer.UsersPosts)
        console.log("ok input")
    }
    console.log("inside post")
})

$('body').on("click", ".deletePost", async function () {
    postId = $(this).data().postid
    await woofer.deletePostFromDB(postId)
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts)


})

$('body').on("click", ".commentPostButton", async function () {
    const commentText = $('.commentInput').val();
    if (validateInput(commentText)) {
        await saveCommentInDB(woofer.userName, woofer.userId,commentText)
        await woofer.getPostFromDb();
        render.renderFeed(woofer.UsersPosts)
        console.log("input Not Empty")
    }
    console.log(this)


})


$('body').on("click", "deleteComment", function () {
    postId = $(this).data().postid
    await woofer.deleteCommentFromDB(postId)
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts)})



//// helper function 
function validateInput(input) {
    if (input === "") { return false }
    return true
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}


////post 


savePostInDB = async function (user, userId, postText) {
    const newPost = {
        user: user,
        text: postText,
        likes: [],
        comments: [],
        date: new Date(),
        userId: userId

    }
    await woofer.savePostInDB(newPost);
    return 0
}


saveCommentInDB = async function (user, postId, commentText) {
    const newComment = {
        user : user,
        text : commentText,
        date : new Date() ,
        postId: postId

    }
    await woofer.saveCommentInDB(newComment);
    return 0
}





