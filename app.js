//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Sloop port gabion gunwalls doubloon spirits hornswaggle Cat o'nine tails lad. Keelhaul cog long clothes Sea Legs Plate Fleet landlubber or just lubber skysail Buccaneer heave down. Jib poop deck overhaul hang the jib execution dock dance the hempen jig Pieces of Eight pirate wench. Barkadeer interloper Arr lugsail square-rigged haul wind fore lass hogshead. Fathom barque lanyard league scuppers spike weigh anchor parley schooner. Heave to run a shot across the bow gally skysail ballast grog blossom come about Cat o'nine tails quarterdeck. Plate Fleet mizzenmast mizzen furl Barbary Coast measured fer yer chains Admiral of the Black topmast cackle fruit. Driver black spot smartly wherry bilge water log Sink me lugger chandler. Fire in the hole Shiver me timbers Nelsons folly gaff warp blow the man down Yellow Jack spyglass haul wind. Pink tack bounty Pirate Round nipperkin killick yawl matey flogging. Gaff bounty Pirate Round case shot mutiny log grog blossom chase cutlass.";
const aboutContent = "Swab deadlights interloper Cat o'nine tails lugsail tackle gun reef knave. Gabion driver run a shot across the bow Gold Road hempen halter booty splice the main brace brigantine draft. Brig reef yard snow chase lanyard barque quarter scurvy. Blimey ho black spot clipper chandler loaded to the gunwalls crimp sloop interloper. Loaded to the gunwalls swing the lead handsomely ballast marooned spyglass line gabion knave. Hail-shot tender reef sails dance the hempen jig Chain Shot yard rutters gun plunder. Trysail fire in the hole ho lee chase Cat o'nine tails Sea Legs draft run a rig. Deadlights hornswaggle Spanish Main tender smartly careen ho topgallant skysail. Jury mast yo-ho-ho run a rig furl fire ship boom prow stern clap of thunder. League line Sail ho lugger weigh anchor Pirate Round salmagundi ho lateen sail. Broadside Jack Tar barkadeer spike to go on account nipper reef topsail scurvy. ";
const contactContent = "Flogging ballast loot Davy Jones' Locker coxswain shrouds lanyard transom aft. Gangplank reef sails parrel black jack brigantine draft walk the plank man-of-war marooned. Shiver me timbers knave ahoy matey pirate gun hail-shot pressgang cutlass. Matey smartly rum hands bring a spring upon her cable Plate Fleet aft gunwalls sloop. Strike colors plunder landlubber or just lubber smartly bilge crow's nest driver brig aye. Provost keel Brethren of the Coast ho Pieces of Eight fluke Buccaneer holystone driver. Scourge of the seven seas scallywag port bounty topmast pressgang list barkadeer warp. Dance the hempen jig long boat sheet cable gaff Chain Shot splice the main brace yo-ho-ho avast. Man-of-war hearties boatswain pressgang hands wench coxswain loot topmast. Ballast Jack Tar long boat mutiny hogshead bilged on her anchor Corsair lee deadlights. Squiffy piracy quarterdeck yo-ho-ho brigantine schooner jack dance the hempen jig carouser.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true
});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.listen(3000, function() {
  console.log("Server started on http://localhost:3000");
});
