const createEmotionTweetIdMap = (data) => {
    const combined_popularity_score = data["combined_popularity_count"]
    const prediction = data["prediction"]  
    //const text = data["text"]
    const tweet_id = data["tweet_id"]

    const emotion_tweet_id_map = {};

    for (let i = 0; i < 8; i++){
        emotion_tweet_id_map[i] = []
    }
    
    for (let i = 0; i < Object.keys(tweet_id).length ; i++){
        if(emotion_tweet_id_map[prediction[i]].length < 5){
            emotion_tweet_id_map[prediction[i]].push(tweet_id[i]); 
        }
    }

    return emotion_tweet_id_map;
}

export default createEmotionTweetIdMap;