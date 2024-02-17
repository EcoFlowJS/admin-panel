import userSignoutService from "../../service/user/userSignout.service";

const signoutHandler = (setSignOut: any) => {
  userSignoutService().then((response) => {
    if (response.success) setSignOut(true);
  });
};

export default signoutHandler;
