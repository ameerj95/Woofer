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
        render.renderFeed(woofer.UsersPosts, woofer.userName)
    })
}

$(document).ready(async function () {
    render.renderLogin()
})

//User sign-in 
$("body").on("click",".signupinlogin",async function(){
    render.renderSignUp()
})

//User login 
$('body').on("click", ".loginbtn", async function () {
    await woofer.login()
    if (woofer.userName === false) {
        render.renderLogin()
        alert("Email or password is incorrect")
    }
    else {
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
    render.renderFeed(woofer.UsersPosts, woofer.userName)

})

//Delete post
$('body').on("click", ".deletePost", async function () {
    postId = $(this).data().postid
    await woofer.deletePostFromDB(postId)
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts, woofer.userName)


})

//-------------------------------------------------------------------------
//Add comment 
//-------------------------------------------------------------------------
$('body').on("click", ".commentPostButton", async function () {
    const postId = $(this).data().postid;
    const commentText = $(this).siblings(`.commentInput`).val()

    await woofer.saveCommentInDB(woofer.userName, postId, commentText);
    //await saveCommentInDB()
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts, woofer.userName)

})
//-------------------------------------------------------------------------
//Delete comment
//-------------------------------------------------------------------------
$('body').on("click", ".deleteComment", async function () {
    const commentId = $(this).data().commentid
    await woofer.deleteCommentFromDB(commentId)
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts, woofer.userName)
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

//-------------------------------------------------------------------------
//Navbar event listeners
//-------------------------------------------------------------------------
//search friends

$("body").on("click", "#searchFriends", async function () {
    console.log("in event listener of searchFriends")
    render.renderDisplayFriends(await woofer.getFriends())
})

//-------------------------------------------------------------------------
//search hashtag
//-------------------------------------------------------------------------
$("body").on("click", "#searchHash", async function () {
    console.log("in event listener of hashsearch page")
    render.renderSearchHash([],woofer.userName)
})

//-------------------------------------------------------------------------
//profile page
//-------------------------------------------------------------------------
$("body").on("click", "#profile", async function () {
    console.log("in event listener of profile page")
    render.renderProfile(await woofer.getUser(woofer.userName), woofer.userName)
})
//-------------------------------------------------------------------------
//logout
//-------------------------------------------------------------------------
$("body").on("click", "#logout", async function () {
    console.log("in event listener of logout")
    await woofer.logout()
    render.renderLogin()
})
//-------------------------------------------------------------------------
//Hash Search Event listener
//-------------------------------------------------------------------------
$("body").on("click", "#hashSearchBtn", async function () {
    console.log("in event listener of hashsearch button")
    render.renderSearchHash(await woofer.getSearchedHash(),woofer.userName)
})
//-------------------------------------------------------------------------
//Profile Edit Event listener
//-------------------------------------------------------------------------
$("body").on("click", "#editButton", async function () {
    console.log("in event listener of edit button")
    render.renderEdit(await woofer.getUser(woofer.userName))
})
//-------------------------------------------------------------------------
//Profile Edit Page listeners
//-------------------------------------------------------------------------
$("body").on("click", "#editBtnProfile", async function () {
    console.log("in event listener of edit button profile")
    render.renderProfile(await updateProfile(),woofer.userName)
})
//-------------------------------------------------------------------------
$("body").on("click","input",async function(){
    console.log("do nothing")
})

//-------------------------------------------------------------------------
$("body").on("click",".profilelink",async function(){
    console.log("in event listener of edit button profile")
    render.renderProfile(await woofer.getUser($(this).data().username) , woofer.userName)
})
//-------------------------------------------------------------------------
$("body").on("click","#feed",async function(){
    console.log("in event listener of feed")
    LoadPage()
})

