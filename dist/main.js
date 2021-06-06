const renderer = new Renderer()
var comment = {
    user : "ameer",
    text : "shutup moses! its sunny!",
    date : "Sunday 2/2/2020" 
}
var comment2 = {
    user : "alaa",
    text : "did it rain?",
    date : "Sunday 2/2/2020" 
}

var post = {
    user:"muses",
    text:"today is a rainy day",
    date:"sunday 2/2/2020",
    comments:[comment,comment2]
}

var posts = [post,post,post]
console.log("hi")
renderer.renderPosts(posts)
// const PostBtn = $('#PostButton');
// const inputTextElement = $('input');
// const woofer = new WooferManger();
// const render = new Renderer();
// var counter_user=0;
// const LoadPage = async function () {
//     await Woofer.getPostFromDb();
//     //render.render_data(woofer.UserPosts)

// }

// const savePost = async function () {
//     counter_user++;
//     const text = inputTextElement.val();
//     if (text === "") { return }
//     const post={
//         user:"user"+counter_user,
//         text:text,
//         likes:[],
//         date: new Date()
//     }
//     woofer.savePost(post)
//         // render.render_data(woofer.UserPosts)

// }
// // PostBtn.on("click", savePost){

// // }
