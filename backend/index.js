const natural = require("natural");
const express = require("express");
const app = express();
const fs = require("fs");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const pos = require('pos');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(fileUpload({
    createParentPath: true
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));


app.post("/analyze", (req, res) => {
    
  if (!req.files.file) {
    return res.status(400).send("No file was uploaded.");
  }

  const file = req.files.file;
  const text = file.data.toString("utf8");
  const words = new pos.Lexer().lex(text);
  const taggedWords = new pos.Tagger().tag(words);

  let nouns = 0, pronouns = 0, adjectives = 0, adverbs = 0;

  taggedWords.forEach((word) => {
    if(word[1]==='NN' || word[1]==='NNS' || word[1]==='NNP' || word[1]==='NNPS'){
      nouns++;
    }
    else if(word[1]==='PRP' || word[1]==='PRP$'){
      pronouns++;
    }
    else if(word[1]==='RB' || word[1]==='RBR' || word[1]==='RBS'){
      adverbs++;
    }
    else if(word[1]==='JJ' || word[1]==='JJR' || word[1]==='JJS'){
      adjectives++;
    }

  });

  const total = nouns + pronouns + adjectives + adverbs;
  const nounsPercentage = (nouns / total) * 100;
  const pronounsPercentage = (pronouns / total) * 100;
  const adjectivesPercentage = (adjectives / total) * 100;
  const adverbsPercentage = (adverbs / total) * 100;

  res.json({
    total : total,
    nouns: nounsPercentage,
    pronouns: pronounsPercentage,
    adjectives: adjectivesPercentage,
    adverbs: adverbsPercentage,
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
