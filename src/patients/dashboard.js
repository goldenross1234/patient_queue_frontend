useEffect(() => {
  fetch("/api/patients/dashboard/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("patient_access")}`,
    },
  })
    .then(res => res.json())
    .then(data => console.log(data));
}, []);
