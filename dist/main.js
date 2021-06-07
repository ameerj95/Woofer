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

// localStorage.setItem("user",JSON.stringify(newUser))
// const localUser = JSON.parse(localStorage.getItem("user"))
// console.log("my extract user ", localUser)

const LoadPage = async function () {
    if (userLogged === false) {

        render.renderSignUp();
    } else {
        woofer.getPostFromDb().then(function (err, res) {
            render.renderFeed(woofer.UsersPosts)
        })
        // const data=woofer.UsersPosts;

    }
}

$(document).ready(async function () {
    await LoadPage()
})



////////sign up contrloer creat new user ////////////
$('body').on("click", ".signupbtn", async function () {
    const inputs = $(this).closest('.container').find("input")
    /////commet below/////////
    const email = $(inputs)[0].value
    const firstPass = $(inputs)[1].value
    const secondPass = $(inputs)[2].value

    const userName = "testimg"
    const bio = "testing "
    /////commet above/////////

    ///////////////uncoment this 
    // const userName =  $(inputs)[0].value
    // const email =  $(inputs)[1].value
    // const firstPass =  $(inputs)[2].value
    //  const bio=  $(inputs)[3].value



    if (!validateEmail(email)) {
        alert("ok email")
    }

    await woofer.creatUser(userName, email, bio);
    userLogged = !userLogged;
    LoadPage()
    // console.log($(this).closest('.container').find("input"))
    // console.log($(this).closest('.container').find("input").val())

})
$('body').on("click", ".cancelbtn", function () {
    render.renderLogin()
})


$('body').on("click", ".loginbtn", function () {
    const inputs = $(this).closest('.container').find("input")
    const email = inputs[0].value
    const pass = inputs[1].value
    console.log("---------login-----------", email, pass)
})
const inputs = $(this).closest('.container').find("input")


/////////////////post controler///////////////



$('body').on("click", "#postButton", async function () {
    const postText = $('#postInput').val();
    await woofer.savePostInDB(postText)
    await woofer.getPostFromDb()
    render.renderFeed(woofer.UsersPosts)

})

$('body').on("click", ".deletePost", async function () {
    postId = $(this).data().postid
    await woofer.deletePostFromDB(postId)
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts)


})
/////////////////////////comment controler/////////////////
$('body').on("click", ".commentPostButton", async function () {
    const postId = $(this).data().postid;
    const commentText = $('.commentInput').val();
    if (validateInput(commentText)) {
        await saveCommentInDB(woofer.userName, postId, commentText)
        await woofer.getPostFromDb();
        render.renderFeed(woofer.UsersPosts)
    }
})


$('body').on("click", ".deleteComment", async function () {
    const commentId = $(this).data().commentid
    await woofer.deleteCommentFromDB(commentId)
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts)
})



/////////////////////////////signup controller/////////////////

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




saveCommentInDB = async function (user, postId, commentText) {
    const newComment = {
        user: user,
        text: commentText,
        date: new Date(),
        postId: postId

    }
    console.log("_____________comment reseverd ____", newComment)
    await woofer.saveCommentInDB(newComment);
    return 0
}





