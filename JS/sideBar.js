const sidebar = document.getElementById("sidebar")
const sidebarTrigger = document.getElementById(
  "sidebar__trigger",
)

sidebarTrigger.addEventListener("click", () => {
    if (sidebar.classList.contains("isClosed")) {
      sidebar.classList.remove("isClosed")
    } else {
      sidebar.classList.add("isClosed")
    }
  })
  