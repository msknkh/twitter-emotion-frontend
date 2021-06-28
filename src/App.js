import './App.css';
import React, { useState } from 'react'
import createEmotionTweetIdMap from './utils';
//import {TwitterTweetEmbed} from 'react-twitter-embed';
import { Tweet } from 'react-twitter-widgets'
import { PieChart } from 'react-minimal-pie-chart';


function App() {

  const [inputText, setInputText] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(null)
  const [selectedEmotion, setSelectedEmotion] = useState(0)

  async function fetchData(keyword, count_of_tweets) {
    const response = await fetch(`http://127.0.0.1:5000/tweets/?keyword=${keyword}&count_of_tweets=${count_of_tweets}`);
    const data = await response.json();
    const emotion_tweet_id_map = createEmotionTweetIdMap(data)
    setData(emotion_tweet_id_map)
    console.log(emotion_tweet_id_map);
    return data;
  }

  const match_integer_to_emotion = {
    0: "Anger",
    1: "Disgust",
    2: "Fear", 
    3: "Sadness",
    4: "Joy",
    5: "Neutral",
    6: "surprise"
  }

  const handleInputTextChange = (event) => {
      event.persist();
      setSubmitted(false);
      setInputText(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if(inputText){
      fetchData(inputText, 100).then(response => {
        console.log(response)
        }
      )
    }
  };

  const handleEmotionButtonClick = (number) => {
    setSelectedEmotion(7)
    setSelectedEmotion(number)
  }

  return (
    <div className="App">
      <div class='main-heading'> Twitter Emotion Analysis</div>
      <div class='sub-heading'> Type in any hashtag or keyword and press enter to know Twitter Emotions</div>
      <form onSubmit = {handleSubmit} class="form">
        <input 
            type='text'
            class="text-field"
            placeholder='Enter keyword'
            value={inputText}
            onChange={handleInputTextChange}
        />
        
        <button type = 'submit' class="keyword-search-button">Click to submit</button>

        {submitted && !inputText && <div class="input-text-error">Please enter a keyword</div>}
        {!data && inputText && submitted && <div class="success-message">Analysing Tweets</div>}
      </form>

      {Object.entries(match_integer_to_emotion).map((key, value) => (
      <div class="emotion-button-section">
        <button onClick={() => handleEmotionButtonClick(value)} class="emotion-button">
          {match_integer_to_emotion[value]}
        </button>
      </div>))}

      {/* <div class="piechart">
        <PieChart
          data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'T<div class="piechart">
        <PieChart
          data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' },
          ]}
        />
      </div>hree', value: 20, color: '#6A2135' },
          ]}
        />
      </div> */}

      <div class="tweets-section">
        {data && data[selectedEmotion].map((tweet_id, index) => (
            <Tweet class="tweet-main" tweetId={tweet_id} />
          ))}
      </div>

    </div>
  );
}

export default App;
