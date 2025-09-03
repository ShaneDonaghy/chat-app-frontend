<script lang="ts">
  import axios from "axios";
  import { API_HOST } from "../constants";
  import "../styles/chatPopup.css";

  export let onCreate: (newChatId: string) => void;
  export let onClose: () => void;

  let chatName = "";
  let errorMessage: string | null = null;

  async function createChat() {
    try {
      const response = await axios.post(`${API_HOST}/api/v1/chat/`, {
        name: chatName
      });
      onCreate(response.data.data.id);
    } catch (error) {
      console.error(`Error creating chat: ${error}`);
      errorMessage = "Failed to create chat - try again later";
    }
  }
</script>

<div class="popup">
  <div class="close-button"
       on:click={onClose}
       on:keydown|preventDefault={(e) => e.key === "Enter" && onClose()}
       role="button"
       tabindex="0"
  >X
  </div>
  {#if errorMessage}
    <div class="error">{errorMessage}</div>
  {/if}
  <input type="text"
         bind:value={chatName}
         placeholder="Enter Chat Name"
  />
  <button disabled={!chatName.length} on:click={createChat}>Create</button>
</div>

<!--
  - tabIndex="0" focusable with tab key
  - on:keyDown... adds a keyboard event
    listener and preventDefault prevents
    any default enter key behaviour
  - role=button tells assistive tech that
    its a button
-->