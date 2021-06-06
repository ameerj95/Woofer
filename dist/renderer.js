class Renderer{
    constructor() {
        this.source = $('#post-template').html();
        this.template = Handlebars.compile(this.source);
        this.postsElement = $("#contentposts")
    }
    renderPosts(posts) {
        console.log(posts)
        const newHTML = this.template({ posts:posts });
        this.postsElement.empty().append(newHTML);
    }
    renderFeed(){
        
    }
}