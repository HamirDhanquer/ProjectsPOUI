import { Injectable } from "@angular/core";

export interface Post {
  id: number;
  title: string;
  content: string;
  except: string;
  author: string;
}