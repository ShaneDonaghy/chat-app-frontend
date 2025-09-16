// @vitest-environment jsdom

import { beforeEach, describe, it, expect, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { navigate as navigateOriginal } from "svelte-routing";
import axios from "axios";
import ChatListSideBar from "./ChatListSideBar.svelte";

vi.mock("axios");
vi.mock("svelte-routing", () => ({
  navigate: vi.fn(),
}));

const navigate = vi.mocked(navigateOriginal, true);
const axiosGet = vi.mocked(axios, true).get;

beforeEach(() => {
  axiosGet.mockClear();
  navigate.mockClear();
});

describe("ChatListSideBar", async () => {
  const mockedChats = {
    data: {
      data: [
        { id: "chat1", name: "Chat 1" },
        { id: "chat2", name: "Chat 2" },
        { id: "chat3", name: "Chat 3" },
        { id: "chat4", name: "Chat 4" },
      ],
    },
  };

  it("displays no chat messages when there are not chats", async () => {
    axiosGet.mockResolvedValue(mockedChats);
    const { findByText } = render(ChatListSideBar);
    expect(await findByText("Chat 1")).toBeInTheDocument();
    expect(await findByText("Chat 2")).toBeInTheDocument();
  });

  it("navigates to the chat when a chat item is clicked", async () => {
    axiosGet.mockResolvedValue(mockedChats);
    const { findByText } = render(ChatListSideBar);
    const firstChatItem = await findByText("Chat 1");
    expect(firstChatItem).toBeInTheDocument();
    await fireEvent.click(firstChatItem);
    expect(navigate).toHaveBeenCalledWith("/chat1");
  });

  it("shows create chat popup when chat button is clicked", async () => {
    axiosGet.mockResolvedValue({ data: { data: [] } });
    const { getByText, findByText } = render(ChatListSideBar);
    await fireEvent.click(getByText("New Chat"));
    expect(await findByText("Create")).toBeInTheDocument();
  });
});
