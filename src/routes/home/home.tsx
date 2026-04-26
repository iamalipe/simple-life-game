import FormController from "@/components/form/form-controller";
import SimpleSelect from "@/components/select/simple-select";
import ThemeToggle from "@/components/theme-toggle/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, getUUID } from "@/lib/utils";
import { COUNTRY_STATIC } from "@/static/country";
import { getInitAttributes } from "@/static/init-data";
import { useGameStore } from "@/store/game-store";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { PawPrintIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  gender: z.enum(["Male", "Female"]),
  country: z.string().min(2).max(200),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const Home: React.FC = () => {
  const onSetCharacter = useGameStore((state) => state.onSetCharacter);
  const navigate = useNavigate();

  const defaultValues: Partial<FormSchemaType> = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    country: faker.helpers.arrayElement(COUNTRY_STATIC).id,
  };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
    // mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    onSetCharacter({
      age: 0,
      attributes: getInitAttributes(),
      country: data.country,
      firstName: data.firstName,
      gender: data.gender,
      lastName: data.lastName,
      id: getUUID(),
    });
    navigate({
      to: "/game",
    });
  };

  return (
    <main className="h-full-x overflow-hidden flex">
      {/* Left side */}
      <div className="flex-1 relative hidden md:flex flex-col justify-between">
        <div className="pl-5 pr-8 py-4 flex gap-4 items-center">
          <PawPrintIcon className="w-8 h-8" />
          <a href="#" className="text-2xl font-bold">
            Simple Life
          </a>
        </div>
        <div className="md:px-8 md:py-4 px-4 py-2 md:flex relative hidden">
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm z-[-1]"></div>
          <p className="text-white text-xs md:text-base">
            Embark on a journey of simplicity and joy with our intuitive life
            simulation.
          </p>
        </div>
        <img
          src="/auth-bg.jpg"
          alt="Just an"
          className="absolute dark:hidden -z-10 top-0 left-0 w-full h-full object-cover"
        />
        <img
          src="/auth-bg-dark.png"
          alt="Just an"
          className="absolute dark:block hidden -z-10 top-0 left-0 w-full h-full object-cover"
        />
      </div>
      {/* Right side */}
      <div className="flex-1 flex bg-background flex-col">
        <div className="flex md:hidden gap-2 justify-between px-2 py-2 items-center">
          <div className="pl-2 pr-2 py-2 flex gap-2 items-center">
            <PawPrintIcon className="w-6 h-6" />
            <span className="text-lg font-bold">Simple Life</span>
          </div>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
          </div>
        </div>
        <div className="hidden md:flex gap-4 justify-between px-4 py-4">
          <ThemeToggle />
          <div />
        </div>
        <div className="flex flex-col md:max-w-xs max-w-sm justify-center mx-auto flex-1 max-md:p-6 max-md:rounded-md">
          <div className="flex flex-col text-center">
            <span className="text-xl font-bold">Welcome to Simple Life</span>
            <p className="text-sm text-muted-foreground">
              Enter details to get started
            </p>
          </div>
          <form
            className="grid grid-cols-1 gap-4 mt-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormController
              form={form}
              name="firstName"
              onRandom={() => {
                form.setValues({
                  firstName: faker.person.firstName(),
                  lastName: faker.person.lastName(),
                });
              }}
              label="First Name"
              render={({ field, isError, ariaDescribedby }) => (
                <Input
                  id={field.name}
                  value={field.value}
                  type="text"
                  name="firstName"
                  placeholder="John"
                  className={cn([isError ? "border-destructive" : ""])}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />
            <FormController
              form={form}
              name="lastName"
              label="Last Name"
              render={({ field, isError, ariaDescribedby }) => (
                <Input
                  id={field.name}
                  value={field.value}
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  className={cn([isError ? "border-destructive" : ""])}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />
            <FormController
              form={form}
              name="gender"
              label="Gender"
              render={({ field }) => (
                <div className="flex gap-2">
                  <div
                    onClick={() => field.onChange("Male")}
                    className={cn([
                      "h-8 flex-1 cursor-pointer flex items-center justify-center border rounded-lg",
                      field.value === "Male" &&
                        "bg-primary text-primary-foreground",
                    ])}
                  >
                    Male
                  </div>
                  <div
                    onClick={() => field.onChange("Female")}
                    className={cn([
                      "h-8 flex-1 cursor-pointer flex items-center justify-center border rounded-lg",
                      field.value === "Female" &&
                        "bg-primary text-primary-foreground",
                    ])}
                  >
                    Female
                  </div>
                </div>
              )}
            />
            <FormController
              form={form}
              name="country"
              label="Country"
              onRandom={() => {
                form.setValues({
                  country: faker.helpers.arrayElement(COUNTRY_STATIC).id,
                });
              }}
              render={({ field, isError }) => (
                <SimpleSelect
                  id={field.name}
                  value={field.value}
                  options={COUNTRY_STATIC.sort((a, b) =>
                    a.name.localeCompare(b.name),
                  ).map((e) => ({
                    label: `${e.flag} ${e.name}`,
                    value: e.id,
                  }))}
                  name="country"
                  placeholder="Select a country"
                  className={cn([isError ? "border-destructive" : ""])}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            {form.formState.errors.root && (
              <p className="text-xs text-destructive mt-1">
                {form.formState.errors.root.message}
              </p>
            )}
            <div className="flex flex-col gap-1">
              <Button
                onClick={() => {
                  form.setValues({
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    gender: faker.helpers.arrayElement(["Male", "Female"]),
                    country: faker.helpers.arrayElement(COUNTRY_STATIC).id,
                  });
                }}
                className="w-full"
                variant="secondary"
              >
                Randomize Everything
              </Button>
              <Button className="w-full" type="submit">
                Begin Life
              </Button>
            </div>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Home;
