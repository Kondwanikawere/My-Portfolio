<script setup>
import axiosClient from '@/axios'
import { onMounted, ref } from 'vue'
import router from '../router';

const messages = ref([])

/* ------------------ Messages ------------------ */
const fetchMessages = async () => {
  try{
    // 1. Get CSRF cookie
    await axiosClient.get('/sanctum/csrf-cookie')

    const res = await axiosClient.get('/api/messages')
    messages.value = res.data

  } catch (error){
    console.error('Error fetching messages:', error)
  }
}
onMounted(fetchMessages)


const showModal = ref(false)
const selectedMessage = ref(null)

/* ------------------ Profile ------------------ */
const showProfileModal = ref(false)

const profile = ref({
  name: '',
  email: '',
  password: ''
})

/* ------------------ Message Logic ------------------ */
const openModal = (msg) => {
  selectedMessage.value = msg
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedMessage.value = null
}

const deleteMessage = async (msg) => {
  if (!confirm('Are you sure you want to delete this message?')) return

  try {
    await axiosClient.get('/sanctum/csrf-cookie')
    await axiosClient.delete(`/api/messages/${msg.id}`)

    // Remove from local state after successful deletion
    messages.value = messages.value.filter(m => m.id !== msg.id)

  } catch (error) {
    console.error('Failed to delete message:', error)
    alert('Failed to delete message.')
  }
}

const logout = async () => {
  try {
    // Sanctum CSRF cookie
    await axiosClient.get('/sanctum/csrf-cookie')

    // Call Breeze logout
    await axiosClient.post('/logout')

    // Clear frontend state
    messages.value = []

    // Redirect to login
    router.push({ name: 'login' });

  } catch (error) {
    console.error('Logout failed:', error)
    alert('Failed to logout.')
  }
}

const markAsRead = async (msg) => {
  try {
    await axiosClient.get('/sanctum/csrf-cookie')
    await axiosClient.patch(`/api/messages/${msg.id}/read`)
    msg.read = 1
   
  } catch (error) {
    console.error('Failed to mark as read:', error)
    alert('Failed to mark message as read.')
  }
}

const formatDateTime = (dateString) => {
  if (!dateString) return ''

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateString))
}

const fetchProfile = async () => {
  try {
    await axiosClient.get('/sanctum/csrf-cookie')
    const response = await axiosClient.get('/api/user', {
      metadata: { routeName: router.currentRoute.value.name }
    })
    if (response && response.data) {
      profile.value.name = response.data.name
      profile.value.email = response.data.email
      profile.value.password = ''
    }
  } catch (error) {
    console.log('Failed to fetch profile')
  }
}

const openProfileModal = async () => {
  await fetchProfile()
  showProfileModal.value = true
}

const closeProfileModal = () => {
  showProfileModal.value = false
  profile.value.password = ''
}

const saveProfile = async () => {
  try {
    await axiosClient.get('/sanctum/csrf-cookie')
    const payload = {
      name: profile.value.name,
      email: profile.value.email
    }
    if (profile.value.password) {
      payload.password = profile.value.password
    }

    await axiosClient.put('/api/profile', payload)
    closeProfileModal()
  } catch (error) {
    console.error('Failed to update profile:', error)
    alert('Failed to update profile.')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 p-4 font-poppins">
    <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 class="text-xl font-semibold text-gray-800">Clients' Messages</h2>

        <div class="flex gap-2">
            <button
            @click="openProfileModal"
            class="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 text-black"
            >
            Edit Profile
            </button>

            <button
            @click="logout"
            class="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
            Logout
            </button>
        </div>
        </div>


      <!-- TABLE (Desktop & Tablet) -->
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-indigo-600 text-white">
            <tr>
              <th class="px-6 py-4">ID</th>
              <th class="px-6 py-4">Name</th>
              <th class="px-6 py-4">Email</th>
              <th class="px-6 py-4">Received</th>
              <th class="px-6 py-4">Message</th>
              <th class="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y">
            <tr
              v-for="msg in messages"
              :key="msg.id"
              :class="{ 'opacity-60': msg.read }"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 font-medium text-gray-600">#{{ msg.id }}</td>
              <td class="px-6 py-4 text-gray-600">{{ msg.name }}</td>
              <td class="px-6 py-4 text-gray-600">{{ msg.email }}</td>
              <td class="px-6 py-4 text-gray-500 text-xs">
                {{ formatDateTime(msg.created_at) }}
              </td>

              <td class="px-6 py-4">
                <button
                  @click="openModal(msg)"
                  class="text-indigo-600 hover:underline"
                >
                  View Message
                </button>
              </td>

              <td class="px-6 py-4 space-x-2">
                <!-- Show "Mark as Read" button if unread -->
                <button
                  v-if="msg.read == 0"
                  @click="markAsRead(msg)"
                  class="px-3 py-1 mb-1 text-xs rounded text-white bg-green-600"
                >
                  Mark as Read
                </button>

                <!-- Show non-clickable "Read" label if already read -->
                <span
                  v-else
                  class="px-3 py-1 text-xs rounded text-gray-700 bg-gray-200"
                >
                  Read
                </span>

                <!-- Delete button -->
                <button
                  @click="deleteMessage(msg)"
                  class="px-3 py-1 text-xs bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <!-- CARDS (Mobile) -->
      <div class="md:hidden p-4 space-y-4">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="border rounded-lg p-4 shadow-sm"
          :class="{ 'opacity-60': msg.read }"
        >
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-800">{{ msg.name }}</h3>
            <span class="text-xs text-gray-500">#{{ msg.id }}</span>
          </div>

          <p class="text-sm text-gray-600 mt-1">📧 {{ msg.email }}</p>
          <p class="text-xs text-gray-500 mt-1">
            Received: {{ formatDateTime(msg.created_at) }}
          </p>

          <div class="flex gap-2 mt-3">
            <button
              @click="openModal(msg)"
              class="flex-1 text-sm bg-indigo-600 text-white py-1 rounded"
            >
              View
            </button>

            <!-- Only show "Mark as Read" if unread -->
            <button
              v-if="msg.read == 0"
              @click="markAsRead(msg)"
              class="flex-1 text-sm py-1 rounded text-white bg-green-600"
            >
              Mark
            </button>

            <!-- Show "Read" label if already read -->
            <span
              v-else
              class="flex-1 text-center text-sm py-1 rounded text-gray-700 bg-gray-200"
            >
              Read
            </span>

            <button
              @click="deleteMessage(msg)"
              class="flex-1 text-sm bg-red-600 text-white py-1 rounded"
            >
              Delete
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- MESSAGE MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          @click="closeModal"
          class="absolute top-2 right-3 text-xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        <h3 class="text-lg font-semibold mb-2">
          Message #{{ selectedMessage?.id }}
        </h3>

        <p class="text-xs text-gray-500 mb-4">
          Received: {{ formatDateTime(selectedMessage?.created_at) }}
        </p>

        <p class="text-gray-700 text-sm">
          {{ selectedMessage?.message }}
        </p>

        <div class="mt-6 text-right">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- PROFILE MODAL -->
    <div
    v-if="showProfileModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="closeProfileModal"
    >
    <div class="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
        @click="closeProfileModal"
        class="absolute top-2 right-3 text-xl text-gray-400 hover:text-gray-600"
        >
        &times;
        </button>

        <h3 class="text-lg font-semibold mb-4 text-black">Edit Profile</h3>

        <div class="space-y-4">
        <div>
            <label class="block text-sm text-gray-600 mb-1">Name</label>
            <input
            v-model="profile.name"
            type="text"
            class="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200 text-black"
            />
        </div>

        <div>
            <label class="block text-sm text-gray-600 mb-1">Email</label>
            <input
            v-model="profile.email"
            type="email"
            class="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200 text-black"
            />
        </div>

        <div>
            <label class="block text-sm text-gray-600 mb-1">
            New Password <span class="text-xs text-gray-400">(optional)</span>
            </label>
            <input
            v-model="profile.password"
            type="password"
            class="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200 text-black"
            />
        </div>
        </div>

        <div class="mt-6 flex justify-end gap-2">
        <button
            @click="closeProfileModal"
            class="px-4 py-2 bg-gray-200 rounded text-black"
        >
            Cancel
        </button>
        <button
            @click="saveProfile"
            class="px-4 py-2 bg-indigo-600 text-white rounded"
        >
            Save
        </button>
        </div>
    </div>
    </div>

  </div>
</template>
