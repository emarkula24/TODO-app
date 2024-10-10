import { Eta } from "./deps.js";
import scrypt from "./deps.js";
import * as userService from "./userService.js";
import * as sessionService from "./sessionService.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showRegistrationForm = (c) => c.html(eta.render("registration.eta"));

const registerUser = async (c) => {
  const body = await c.req.parseBody();
  if (body.password !== body.verification) {
    return c.text("The provided passwords did not match.");
  }

  const existingUser = await userService.findUserByEmail(body.email);
  if (existingUser) {
    return c.text(`A user with the email ${body.email} already exists.`);
  }

  const user = {
    id: crypto.randomUUID(),
    email: body.email,
    passwordHash: scrypt.hash(body.password),
  };

  await userService.createUser(user);
  await sessionService.createSession(c, user);
  return c.redirect("/");
};

const showLoginForm = (c) => c.html(eta.render("login.eta"));

const loginUser = async (c) => {
    const body = await c.req.parseBody();
  
    const user = await userService.findUserByEmail(body.email);
    if (!user) {
      return c.text(`No user with the email ${body.email} exists.`);
    }
  
    const passwordsMatch = scrypt.verify(body.password, user.passwordHash);
  
    if (!passwordsMatch) {
      return c.text(`Incorrect password.`);
    }
  
    await sessionService.createSession(c, user);
    
    return c.redirect("/");
  };

  const logoutUser = async (c) => {
    await sessionService.deleteSession(c);
    return c.redirect("/");
  };

export { registerUser, showRegistrationForm, showLoginForm, loginUser, logoutUser };