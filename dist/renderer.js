class Renderer {
    constructor() {
        //================================================
        //content
        this.header = $("#header")
        this.content = $("#contentbody")
        //================================================
        //navbar
        this.source_navbar = $('#navbar-template').html();
        this.template_navbar = Handlebars.compile(this.source_navbar);
        //================================================
        //posts template
        this.source_post = $('#post-template').html();
        this.template_post = Handlebars.compile(this.source_post);
        //=================================================
        //feed template
        this.source_feed = $('#feed-template').html();
        this.template_feed = Handlebars.compile(this.source_feed);
        //=================================================
        //login template
        this.source_login = $('#login-template').html();
        this.template_login = Handlebars.compile(this.source_login);
        //=================================================
        //signup template
        this.source_signup = $('#signup-template').html();
        this.template_signupn = Handlebars.compile(this.source_signup);

    }
    renderPosts(posts) {
        this.postsElement = $("#contentposts")
        console.log(posts)
        const newHTML = this.template_post({ posts:posts });
        this.postsElement.empty().append(newHTML);
    }
    renderFeed(posts){
        this.renderNavBar(true)
        console.log("in renderfeed")
        const newHTML = this.template_feed();
        this.content.empty().append(newHTML);
        this.renderPosts(posts)
    }
    renderLogin(){
        this.renderNavBar(false)
        console.log("in renderLogin")
        const newHTML = this.template_login();
        this.content.empty().append(newHTML);
    }
    renderSignUp(){
        this.renderNavBar(false)
        console.log("in render signup")
        const newHTML = this.template_signupn();
        this.content.empty().append(newHTML);
    }
    renderSearchFriends(){

    }
    renderSearchHash(){

    }
    renderProfile(){

    }
    renderNavBar(isConnected){
        console.log("in navbar: "+isConnected)
        const newHTML = this.template_navbar({connection: isConnected});
        this.header.empty().append(newHTML);
    }
}