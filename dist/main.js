const PostBtn = $('#postButton');
const inputTextElement = $('input');
const woofer = new WooferManger();
const render = new Renderer();
var ErrMsg = "";
const userLogged = true
const LoadPage = async function () {
    if (userLogged === false) {
        ErrMsg = "you Must Login First"
        // render.renderError(woofer.UserPosts)
        return
    } else {
        await woofer.getPostFromDb();
        console.log(woofer.UsersPosts)
        // const data=woofer.UsersPosts;
        render.renderPosts(woofer.UsersPosts)

    }
}

$(document).ready(async function () {
    await LoadPage()
})


const savePost = async function () {
    console.log("hi")
    await woofer.getPostFromDb();
    console.log(woofer.UsersPosts)
    // var username = prompt("What is your name?");// this is for testing 
    // const text = inputTextElement.val();
    // if (validateInput(text)) {

    //     const post = {
    //         user: username,
    //         text: text,
    //         likes: [],
    //         date: new Date()
    //     }
    //     woofer.savePostInDB(post)
    // } else {
    //     ErrMsg = "input is not valid";
    //     //render.render_date({error:ErrMsg})
    //     return;
    // }


    // render.render_data(woofer.UserPosts)

}
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




$('body').on("click", "commentPostButton", function () {

})

$('body').on("click", "deleteComment", function () {
    // const comment
})

PostBtn.on("click", savePost)



// const LogIn = async function(){
//     // var email = prompt("What is your Email?");// this is for testing 
//     userLogged=!userLogged

// }

// deletePost()
//// helper function 
function validateInput(input) {
    if (input === "") { return true }
    return false
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}


////





