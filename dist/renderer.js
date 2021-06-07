class Renderer{
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
        //hash template
        this.source_hash = $('#hash-template').html();
        this.template_hash = Handlebars.compile(this.source_hash);
        //=================================================
        //login template
        this.source_login = $('#login-template').html();
        this.template_login = Handlebars.compile(this.source_login);
        //=================================================
        //signup template
        this.source_signup = $('#signup-template').html();
        this.template_signup = Handlebars.compile(this.source_signup);
        //=================================================
        //edit template
        this.source_edit = $('#edit-template').html();
        this.template_edit = Handlebars.compile(this.source_edit);
        //=================================================
        //profile template
        this.source_profile = $('#profile-template').html();
        this.template_profile = Handlebars.compile(this.source_profile);
         //=================================================
        //friends template
        this.source_friends = $('#friends-template ').html();
        this.template_friends = Handlebars.compile(this.source_friends);
        //=================================================
        //display friends template
        this.source_displayfriends = $('#displayfriends-template ').html();
        this.template_displayfriends = Handlebars.compile(this.source_displayfriends);
        //=================================================
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
        const newHTML = this.template_signup();
        this.content.empty().append(newHTML);
    }
    renderEdit(user){
        this.renderNavBar(true)
        console.log("in render edit")
        const newHTML = this.template_edit(user);
        this.content.empty().append(newHTML);
    }
    renderSearchHash(posts){
        this.renderNavBar(true)
        console.log("in renderfeed")
        const newHTML = this.template_hash();
        this.content.empty().append(newHTML);
        this.renderPosts(posts)
    }
    renderProfile(user,isUser){
        const {name,email,posts,bio} = user
        this.renderNavBar(true)
        console.log("in render profile")
        const newHTML = this.template_profile({name:name,email:email,bio:bio,isUser:isUser});
        this.content.empty().append(newHTML);
        this.renderPosts(user.posts)
    }
    renderNavBar(isConnected){
        console.log("in navbar: "+isConnected)
        const newHTML = this.template_navbar({connection: isConnected});
        this.header.empty().append(newHTML);
    }
    renderFriends(friends){
        this.friendsElement = $("#friendsresult")
        console.log(friends)
        const newHTML = this.template_friends({ friends:friends });
        this.friendsElement.empty().append(newHTML);
    }
    renderDisplayFriends(friends){
        this.renderNavBar(true)
        console.log("in render display friends")
        const newHTML = this.template_displayfriends();
        this.content.empty().append(newHTML);
        this.renderFriends(friends)
    }

}