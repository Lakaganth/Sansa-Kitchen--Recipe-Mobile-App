import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as RecipeActions from "../../../store/actions/recipeActions";
import EditRecipe from "./EditRecipe";

const UserOptions = (props) => {
  const { setShowOptions, rID, navigation, recipe } = props;
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(RecipeActions.deleteRecipe(rID));
  };
  const handleEdit = () => {
    navigation.navigate("Edit", { rID: rID });
  };

  return (
    <>
      <Container onPress={() => setShowOptions(false)}>
        {user.id == recipe.ownerID ? (
          <>
            <Button onPress={handleEdit}>
              <Text>Edit</Text>
            </Button>
            <Button style={{ backgroundColor: "red" }} onPress={handleDelete}>
              <Text>Delete</Text>
            </Button>
          </>
        ) : (
          setShowOptions(false)
        )}
      </Container>
    </>
  );
};

export default UserOptions;

const Container = styled.TouchableOpacity`
  height: 120px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 6;
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  margin: 20px 10px 20px 20px;
`;
const Button = styled.TouchableOpacity`
  flex: 1;
  background-color: orange;
  margin: 0 20px;
  height: 50px;
  border-radius: 10px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: #fff;
  line-height: 23px;
  text-align: center;

  margin: 12px auto;
  text-transform: capitalize;
`;
