const PostBtn = $('#postButton');
const inputTextElement = $('input');
const woofer = new WooferManger();
const render = new Renderer();
var ErrMsg = "";
var userLogged = false

const newUser = {
    name: "firstUser",
    email: "mosahass@gmail.com",
    posts: [],
    isConnected: true,
    bio: "we hope it will work at the end "
}

const LoadPage = async function () {
    woofer.getPostFromDb().then(function (err, res) {
            render.renderFeed(woofer.UsersPosts)
    })
}

$(document).ready(async function () {
    render.renderLogin()
})

//User sign-in 
$('body').on("click", ".signupbtn", async function () {
    await woofer.creatUser();
    LoadPage()
})

//User login 
$('body').on("click", ".loginbtn", async function () {
    await woofer.login()
    if(woofer.userName === false){
        render.renderLogin()
    }
    else{
        LoadPage()
    } 
})

//Cancel button
$('body').on("click", ".cancelbtn", function () {
    render.renderLogin()
})

//Add post
$('body').on("click", "#postButton", async function () {
    
    await woofer.savePostInDB()
    await woofer.getPostFromDb()
    render.renderFeed(woofer.UsersPosts)

})

//Delete post
$('body').on("click", ".deletePost", async function () {
    postId = $(this).data().postid
    await woofer.deletePostFromDB(postId)
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts)


})

//
$('body').on("click", ".commentPostButton", async function () {
    const postId = $(this).data().postid;
    const commentText = $(this).siblings(`.commentInput`).val()

    await woofer.saveCommentInDB(woofer.userName, postId, commentText);
    //await saveCommentInDB()
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts)
    
})

$('body').on("click", ".deleteComment", async function () {
    const commentId = $(this).data().commentid
    await woofer.deleteCommentFromDB(commentId)
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts)
})

//// helper function 
function validateInput(input) {
    if (input === "") { return false }
    return true
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}