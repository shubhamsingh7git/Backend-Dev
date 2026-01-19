function getUser(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Rahul", type: "Premium" });
    }, 1500);
  });
}

function checkSubscription(user) {
  return new Promise((resolve, reject) => {
    if (user.type === "Premium") {
      resolve("Access Granted to Netflix");
    } else {
      reject("Please Subscribe");
    }
  });
}

async function consume() {
  try {
    const user = await getUser("Rahul");
    const result = await checkSubscription(user);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

consume();
