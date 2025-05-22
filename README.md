# Aspire Dashboard Page

This is a demo dashboard built for showcasing frontend engineering skills. The project requires **Node.js v20+**, so make sure it’s installed on your machine.

---

### 🚀 Project Highlights

- The boilerplate is production-ready with only minor adjustments needed.
- **Directory structure overview:**

  - **`components/`**  
    Contains all reusable, generic UI components. These are non-domain-specific.  
    _Example: a `Modal` component goes here, but `CardPreview` does not._

  - **`contexts/`**  
    Contains all React contexts. While the current app didn’t heavily depend on context, I’ve added this layer to demonstrate how I would structure shared state if needed, as mentioned in the assignment.

  - **`features/`**  
    Holds business-specific reusable components.  
    Typically, feature components are composed using generic components. If a feature component is reused across features, it's a sign that it should be promoted to `components/`.

  - **`hooks/`**  
    Includes generic React hooks used across the app.  
    Feature-specific hooks should live within their respective `features/` directories.

  - **`layout/`**  
    Defines the base layout structure of the app — components like `Sidebar`, `Footer`, etc., reside here.

  - **`pages/`**  
    Represents the top-level routes of the application.  
    Each page composes several features to deliver a complete screen.

  - **`reducers/`**  
    Contains custom reducer logic used with the `useReducer` hook for local state management.

- All components in the app are implemented from scratch to demonstrate proficiency.  
  In a real-world production scenario, I would often rely on well-tested third-party libraries to save time, but these implementations are quite close to production quality.

- The design has been followed closely, though some icons (especially in the action bar) had inconsistent or malformed `viewBox` values.

- I made a few judgment calls regarding responsiveness and interactions, especially in cases where the design wasn’t explicit. These were intentional and aimed at maintaining usability.

- The mobile version is partially implemented — since it was marked optional, I prioritized demonstrating component design and architectural skills over full feature completion.

- The code includes unit test coverage for critical and error-prone logic, focusing on real-world scenarios rather than exhaustive test coverage.

---

### 🛠️ How to Run

**Clone the repo**
```sh
git clone https://github.com/iiison/aspire.git
```

**Install Dependencies
```sh
pnpm i
```

**Run Dev Server
```sh
pnpm dev
```

**Run Tests
```sh
pnpm test
```
