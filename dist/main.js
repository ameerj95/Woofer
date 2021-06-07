const PostBtn = $('#postButton');
const inputTextElement = $('input');
const woofer = new WooferManger();
const render = new Renderer();
var ErrMsg = "";
const userLogged = true
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
    //woofer.userName="firstUser";// login 


    ///woofer.creatUser(newUser)
    // await woofer.creatUser(newUser);


    if (userLogged === false) {
        render.renderSignUp();
    } else {
        woofer.getPostFromDb().then(function (err, res) {
            console.log(woofer.UsersPosts)

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
    const email = $($(this).closest('.container').find("input"))[0]
    const firstPass = $($(this).closest('.container').find("input"))[1]
    const secondPass = $($(this).closest('.container').find("input"))[2]

    // const userName= $($(this).closest('.container').find("input"))[3];
    const userName = "MosaDefult"
    const bio = "testing "


    if (!validateEmail(email)) {
        alert("ok email")
    }
    if (firstPass !== secondPass) {
        alert("pass Not Match");
    }
    const newUser = {
        name: userName,
        email: email,
        posts: [],
        isConnected: true,
        bio: bio,
    }


    woofer.creatUser(newUser);
    console.log(email.value)
    console.log(firstPass.value);
    console.log(secondPass.value);

    // console.log($(this).closest('.container').find("input"))
    // console.log($(this).closest('.container').find("input").val())

})



/////////////////post controler///////////////



$('body').on("click", "#postButton", async function () {
    const postText = $('#postInput').val();
    await woofer.savePostInDB(postText)
    await woofer.getPostFromDb()
    render.renderFeed(woofer.UsersPosts)

})


// savePostInDB = async function (user, userId, postText) {
//     const newPost = {
//         user: user,
//         text: postText,
//         likes: [],
//         comments: [],
//         date: new Date(),
//         userId: userId

//     }
//     return woofer.savePostInDB(newPost);
    
// }
// if (validateInput(postText)) {
//      savePostInDB(woofer.userName,woofer.userId, postText).then(function(err1,res1){
//         console.log("res1",res1)
//         woofer.getPostFromDb().then(function(err,res){
//             console.log(woofer.UsersPosts)
//             console.log("%%%%%%%%%%%%%%%%", res)

//              render.renderFeed(woofer.UsersPosts)
//          })
//     })

// }
//})

$('body').on("click", ".deletePost", async function () {
    postId = $(this).data().postid
    await woofer.deletePostFromDB(postId)
    await woofer.getPostFromDb();
    render.renderFeed(woofer.UsersPosts)


})
/////////////////////////comment controler/////////////////
$('body').on("click", ".commentPostButton", async function () {
    const postId = $(this).data().postid;

    console.log(" inside comment")
    console.log(" comment postId", postId)
    console.log("_userName", woofer.userName)
    const commentText = $('.commentInput').val();
    if (validateInput(commentText)) {
        // user, postId, commentText
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





