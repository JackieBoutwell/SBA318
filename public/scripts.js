const deleteItem = async (id) => {
  console.log(id);
  const response = await fetch("/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  return await response.text();
};

export default deleteItem;