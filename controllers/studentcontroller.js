/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import { Student, sequelize } from "../models/Student.js";
await sequelize.sync();

const studentController = {
  // Activity 1: Insert / Create
  insert: async (req, res) => {
    const { StudentId, FirstName, MiddleName, LastName, Course, YearLevel, Section, Status } = req.body;
    const newStudent = await Student.create({
      StudentId, FirstName, MiddleName, LastName, Course, YearLevel, Section, Status
    });
    res.status(201).json({ status: "true", data: newStudent });
  },

  // Activity 2: Get All Data
  all: async (req, res) => {
    const data = await Student.findAll();
    res.json({ data: data });
  },

  // Activity 2: Get Specific Data by ID
  one: async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    res.json({ data: student });
  },

  // Activity 2 & 3: Update Data
  update: async (req, res) => {
    const { id } = req.params;
    const { StudentId, FirstName, MiddleName, LastName, Course, YearLevel, Section, Status } = req.body;
    await Student.update({
      StudentId, FirstName, MiddleName, LastName, Course, YearLevel, Section, Status
    }, { where: { id } });
    res.json({ message: "data updated successfully" });
  },

  // Activity 2 & 3: Delete Data
  delete: async (req, res) => {
    const { id } = req.params;
    await Student.destroy({ where: { id } });
    res.json({ message: "data deleted successfully" });
  },

  // Activity 3: Render View with Full CRUD (.xian)
  indexView: async (req, res) => {
    const data = await Student.findAll();
    res.render("student", { data });
  },

  editView: async (req, res) => {
    const { id } = req.params;
    const data = await Student.findByPk(id);
    res.render("partials/edit", { data });
  }
};
export { studentController };