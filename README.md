# Doctor Listing Page


This page displays a list of doctors with filtering, searching, and sorting functionalities.

- **Search by Doctor Name**
    - An input field allows users to search for doctors by name.
    - Autocomplete suggestions are provided as the user types.
- **Consultation Mode (Radio Buttons)**
    - Options: `Video Consult` and `In Clinic`.
    - Only one option can be selected at a time.
- **Specialties (Multi-Select Checkbox)**
    - Users can filter doctors by multiple specialties.
    - Each doctor may have multiple specialties, and multiple filters can be applied simultaneously.
- **Sort Options**
    - Sort by `fees` (ascending) or `experience` (descending).
- Filters work in combination, with the first applied filter taking precedence.

### 3. **API Integration**
    - API URL: [https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json](https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json)
    - The API provides a list of doctors, which is fetched on the initial load.
    - All filtering, searching, and sorting are handled on the frontend.
    - The applied filters are reflected as query parameters in the URL. Navigating back retains the filters.

## Requirements

### 1. **Technology Stack**
    - Vite for fast development and bundling.
    - React for building the user interface.
    - TypeScript for type safety.
    - Tailwind CSS for styling the application.

### 2. **Functionality**
    - Client-Side Filtering: All filtering, sorting, and searching happen on the client-side after the initial API call.
    - URL Query Parameters: All filters should be shown as query parameters in the URL. Navigation using the browser's back and forward buttons should retain the filters.
    - Filter Prioritization: The filters work in combination, with the first applied filter taking precedence.

---

## Instructions

### 1. **Cloning the Repository**

    Clone the repository to your local machine using the following command:

    ```bash
    git clone [https://github.com/jiyaaat/Doctor-listings.git](https://github.com/jiyaaat/Doctor-listings.git)
    ```

### 2. **Installation**

    Navigate to the project directory and install the dependencies:

    ```bash
    cd Doctor-listings
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### 3. **Running the Application**

    Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open your browser and navigate to the address provided (usually `http://localhost:5173`).

### 4. **Building for Production**

    To build the application for production:

    ```bash
    npm run build
    # or
    yarn build
    # or
    pnpm build
    ```

    The production build will be located in the `dist` directory.
    
## UI Design

The user interface is designed to be intuitive and user-friendly, allowing for easy filtering, searching, and sorting of doctors. Key elements include a prominent search bar with autocomplete, clear radio buttons for consultation mode selection, a multi-select checkbox list for specialties, and dropdown options for sorting. The doctor cards display essential information such as name, specialties, experience, and fees in a clear and organized manner.

**UI Images:**

![image](https://github.com/user-attachments/assets/9f5d72cb-1f44-40b3-934a-6fdf62666a78)
![image](https://github.com/user-attachments/assets/cb2fbf5b-17cc-4a37-b74d-be4d346e93b0)
![image](https://github.com/user-attachments/assets/a31f2b97-e42b-409e-9901-52d87f679daf)
![image](https://github.com/user-attachments/assets/c671b3e6-2a55-4943-867d-e2f6161a753c)

## Deployment link
You can see a live demo of the UI here: [Doctor Listing Page](https://doctor-listings-jiya.netlify.app/)

