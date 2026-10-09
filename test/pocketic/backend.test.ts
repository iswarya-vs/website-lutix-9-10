import { PocketIc, createIdentity } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";
import { registerCaller } from "./test-utils";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
  // The installing caller becomes the first administrator through the app's own
  // public initialization flow; listEnquiries is admin-only.
  await registerCaller(actor, createIdentity("admin"));
});

afterAll(async () => {
  await pic?.tearDown();
});

it("answers an empty-state admin read instead of trapping", async () => {
  await expect(actor.listEnquiries()).resolves.toEqual([]);
});

it("rejects an enquiry missing required fields before any side effect", async () => {
  const result = await actor.submitEnquiry({
    name: "",
    email: "",
    company: [],
    message: "",
  });
  expect(result).toEqual({
    err: "Name, email and message are required.",
  });
  // The rejected submission must not have been stored.
  await expect(actor.listEnquiries()).resolves.toEqual([]);
});

it("rejects an anonymous caller from the admin-only listing", async () => {
  const guest = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  await expect(guest.listEnquiries()).rejects.toThrow(/Unauthorized/i);
});
