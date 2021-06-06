const PostBtn = $('#PostButton');
const inputTextElement = $('input');
const woofer = new WooferManger();
const render = new Renderer();
var counter_user=0;
const LoadPage = async function () {
    await Woofer.getPostFromDb();
    //render.render_data(woofer.UserPosts)

}

const savePost = async function () {
    counter_user++;
    const text = inputTextElement.val();
    if (text === "") { return }
    const post={
        user:"user"+counter_user,
        text:text,
        likes:[],
        date: new Date()
    }
    woofer.savePost(post)
        // render.render_data(woofer.UserPosts)

}
// PostBtn.on("click", savePost){

// }
