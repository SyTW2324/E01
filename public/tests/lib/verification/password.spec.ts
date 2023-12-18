import { describe, it, expect } from "vitest";
import { isSecurePassword } from "$lib/verification/password";

describe("Check password validation", () => {
  it("Check valid passwords", () => {
    expect(isSecurePassword("1qA.2wS,3eD$4rF ")).toEqual(true);
    expect(isSecurePassword("Uh4thF(vETzr")).toEqual(true);
    expect(isSecurePassword(")!pGi`s8PL{'PP9r=3:")).toEqual(true);
    expect(isSecurePassword("\\W,WjO%NV.6529XEu)hsHO)7s#\\+cT&")).toEqual(true);
  });

  it("Check invalid passwords", () => {
    expect(isSecurePassword("")).toEqual(false);
    expect(isSecurePassword("$h0rtPass")).toEqual(false);
    expect(isSecurePassword("1qa.2ws,3ed%4rfg")).toEqual(false);
    expect(isSecurePassword("7681347638274234231")).toEqual(false);
    expect(isSecurePassword("asdasADSAISUDGHdasdasdad_asda")).toEqual(false);
  });
});
