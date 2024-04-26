const deleteItem = async (id) => {
  const response = await fetch("/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });

  return await response.text();
};

const updateItem = async (id) => {
  console.log("in scripts");
  const response = await fetch("/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  }).then((data) => data.json());
  //return await response.text();
};

export { deleteItem, updateItem };