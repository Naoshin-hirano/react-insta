import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import postReducer from "../../features/post/postSlice";
import authReducer from "../../features/auth/authSlice";
import Post from "./Post";

afterEach(() => cleanup());

// likedの数がレンダリングされるかの確認
describe("Rendering the liked counter", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        post: postReducer,
      },
    });
  });

  // いいねが0だとcounterになにも表示されない
  it("Should render nothing ! when getting no liked", () => {
    render(
        <Provider store={store}>
          <Post
            postId={0}
            title={"test title"}
            loginId={0}
            userPost={0}
            liked={[]}
            />
        </Provider>
      );
    expect(screen.queryByTestId("counter")).not.toHaveTextContent();
  });

  // 1いいねあればcounterに１が表示される
  it("Should render 1 ! when getting 1 liked", () => {
    render(
        <Provider store={store}>
          <Post
            postId={0}
            title={"test title"}
            loginId={0}
            userPost={0}
            liked={[0]}/>
        </Provider>
      );
    expect(screen.getByTestId("counter")).toHaveTextContent("1");
  });

  // 4いいねあればcounterに4が表示される
  it("Should render 4 ! when getting 4 liked", () => {
    render(
        <Provider store={store}>
          <Post
            postId={0}
            title={"test title"}
            loginId={0}
            userPost={0}
            liked={[1,3,5,7]}/>
        </Provider>
      );
    expect(screen.getByTestId("counter")).toHaveTextContent("4");
  });
});
