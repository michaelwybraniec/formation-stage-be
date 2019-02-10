var Database = {
    // ============= DATA =============
    users: [],
    articles: [],

    // ============= FUNCTIONS =============

    addUser: function(user){
        if(user) this.users.push(user);
    },

    getUser: function (username) {
        for (var i = 0; i < this.users.length; i++) {
            var user = this.users[i];
            if (user.username === username) {
                return user;
            }
        }
    },

    addArticle: function(article){
        if(article) this.articles.push(article);
    },

    getLastArticle: function(){
        if(this.articles.length > 0) return this.articles[this.articles.length - 1];
        else return null;
    },

    getArticlesFrom: function(username){
        var userArticles = [];

        for(var i = 0; i < this.articles.length; i++){
            if(this.articles[i].ownerName === username){
                userArticles.push(this.articles[i]);
            }
        }

        return userArticles;
    }
};

module.exports = Database;