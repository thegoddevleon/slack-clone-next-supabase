"use client";

import { HiOutlinePaintBrush } from "react-icons/hi2";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MdLightMode } from "react-icons/md";
import { BsLaptop } from "react-icons/bs";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";

const PreferencesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Typography
          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
          variant="p"
        >
          Preferences
        </Typography>
      </DialogTrigger>

      <DialogContent className="max-w-xs md:w-fit">
        <DialogTitle>
          <Typography variant="h3" className="py-5">
            Preferences
          </Typography>
          <hr className="bg-gray-200" />
        </DialogTitle>
        <Tabs orientation="horizontal" defaultValue="themes">
          <TabsList>
            <TabsTrigger value="themes">
              <HiOutlinePaintBrush className="mr-2" />
              <Typography variant="p">Themes</Typography>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="max-w-xs md:max-w-fit" value="themes">
            <Typography variant="p" className="py-2 font-bold">
              Color Mode
            </Typography>
            <Typography variant="p" className="pb-4">
              Choose if slackzz appearance should be light or dark, or follow
              the computer settings
            </Typography>
            <hr className="bg-gray-200 my-5" />
            <Typography variant="p" className="py-2 font-bold">
              Single Color
            </Typography>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesDialog;
