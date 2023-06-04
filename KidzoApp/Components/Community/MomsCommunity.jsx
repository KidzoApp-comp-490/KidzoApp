import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Heart from "../../assets/Community/Frame.png";
import ColoredHeart from "../../assets/Community/Group.png";
import { editpost, addComment } from "../../db/firebase/post"; // Import the addComment function
// import { firebase } from "../../db/Config";
// import "firebase/database";
export default function MomsCommunity({ value, image, idpost, numreact }) {
  const [icon, setIcon] = useState(true);
  const [reactNum, setReactNum] = useState(numreact);
  const [comment, setComment] = useState(""); // State to store the comment
  const [comments, setComments] = useState([]); // State to store the comments

  // useEffect(() => {
  //   // Fetch comments for the post
  //   fetchComments();
  // }, []);

  // const getComments = async (postId) => {
  //   const snapshot = await firebase
  //     .database()
  //     .ref(`posts/${postId}/comments`)
  //     .once("value");
  //   const comments = snapshot.val();
  //   return comments ? Object.values(comments) : [];
  // };

  // Example usage
  // const fetchComments = async () => {
  //   const fetchedComments = await getComments(idpost);
  //   setComments(fetchedComments);
  // };

  const clickHeart = async () => {
    if (icon) {
      setReactNum(reactNum + 1);
      try {
        await editpost(idpost, reactNum + 1);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      setReactNum(reactNum - 1);
      try {
        await editpost(idpost, reactNum - 1);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
    setIcon(!icon); // Toggle the value of 'icon'
  };

  // const addComment = async (postId, comment) => {
  //   const newCommentRef = firebase
  //     .database()
  //     .ref(`posts/${postId}/comments`)
  //     .push();
  //   const newCommentKey = newCommentRef.key;

  //   const commentData = {
  //     id: newCommentKey,
  //     text: comment,
  //   };

  //   await newCommentRef.set(commentData);
  // };

  // Example usage
  // const handleAddComment = async () => {
  //   if (comment.trim() === "") return;

  //   try {
  //     await addComment(idpost, comment);
  //     setComments([...comments, comment]);
  //     setComment("");
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  const imageSource = icon ? Heart : ColoredHeart;

  return (
    <View style={styles.PostsView}>
      <Text style={styles.PostTitle}>{value}</Text>
      <View style={{ alignItems: "center" }}>
        {image === "" ? null : (
          <Image
            source={{ uri: image }}
            style={{
              width: 328,
              height: 243,
              borderRadius: 15,
              resizeMode: "stretch",
            }}
          />
        )}

        <View style={styles.ReactsView}>
          <View style={styles.LeftPart}>
            <TouchableOpacity onPress={clickHeart}>
              <Image source={imageSource} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <Text style={styles.ReactTxt}>{reactNum}</Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.CommentsContainer}>
        <Text style={styles.CommentsTitle}>Comments</Text>
        {comments.map((comment, index) => (
          <Text style={styles.CommentText} key={index}>
            {comment}
          </Text>
        ))}
      </View>

      <View style={styles.CommentInputContainer}>
        <TextInput
          style={styles.CommentInput}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={styles.AddCommentButton}
          onPress={handleAddComment}
        >
          <Text style={styles.AddCommentButtonText}>Post</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  PostsTxt: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 7,
    marginRight: 310,
  },
  PostsView: {
    width: 370,
    paddingTop: 5,
    borderRadius: 15,
    borderColor: "rgba(11, 59, 99, 0.15)",
    borderWidth: 1,
    marginTop: 16,
  },
  userInfoView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 18,
  },
  userName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginLeft: 12,
  },
  PostTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#0B3B63",
    marginTop: 17,
    marginBottom: 16,
    marginHorizontal: 18,
  },
  ReactsView: {
    flexDirection: "row",
    width: 370,
    height: 48,
    paddingBottom: 5,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 16,
    borderColor: "rgba(11, 59, 99, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  LeftPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ReactTxt: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    color: "#FFA8C5",
    marginLeft: 5,
  },
  CommentsContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
    paddingTop: 16,
  },
  CommentsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  CommentText: {
    marginBottom: 8,
  },
  CommentInputContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  CommentInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    borderRadius: 8,
    padding: 8,
  },
  AddCommentButton: {
    backgroundColor: "#0B3B63",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  AddCommentButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
