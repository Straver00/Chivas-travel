const sidebar = document.getElementById("sidebar")
const sidebarTrigger = document.getElementById(
  "sidebar__trigger",
)

sidebarTrigger.addEventListener("click", () => {
    if (sidebar.classList.contains("isClosed")) {
      sidebar.classList.remove("isClosed")
      sidebarTrigger.innerText = "CLOSE"
    } else {
      sidebar.classList.add("isClosed")
      sidebarTrigger.innerText = "OPEN"
    }
  })
  