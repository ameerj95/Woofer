const renderer = new Renderer()
const post = {
    user:"some name",
    text:"this is my post",
    date:"sunday 2/1/2018"
}
const posts = [post,post,post]
renderer.renderPosts(posts)