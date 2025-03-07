import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AddStudentForm = ({ isOpen, onClose, onStudentAdded }) => {
  const [newStudent, setNewStudent] = useState({ name: "", gender: "", address: "" });
  const [loading, setLoading] = useState(false); // Track loading state
  const toast = useToast();

  const handleAddStudent = async () => {
    // Input validation
    if (!newStudent.name || !newStudent.gender || !newStudent.address) {
      toast({
        title: "Validation Error",
        description: "All fields (Name, Gender, Address) are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true); // Start loading spinner
    try {
      const response = await fetch("/student/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        const data = await response.json();
        onStudentAdded(data.student); // Call the parent function to update the student list
        setNewStudent({ name: "", gender: "", address: "" }); // Reset form fields
        toast({
          title: "Success",
          description: data.message || "Student added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose(); // Close modal
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add student.");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add student.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Student</ModalHeader>
        <ModalBody>
          <Box>
            <Input
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              mb={2}
            />
            <Input
              placeholder="Gender"
              value={newStudent.gender}
              onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
              mb={2}
            />
            <Input
              placeholder="Address"
              value={newStudent.address}
              onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
              mb={2}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            onClick={handleAddStudent}
            isLoading={loading} // Show loading spinner
          >
            Add Student
          </Button>
          <Button variant="ghost" onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddStudentForm;
