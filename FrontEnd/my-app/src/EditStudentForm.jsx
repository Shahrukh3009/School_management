import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";

const EditStudentForm = ({ isOpen, onClose, student, onStudentUpdated }) => {
  const [formData, setFormData] = useState(student || {});
  const toast = useToast();

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.gender || !formData.address) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`/student/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Student updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onStudentUpdated(formData); // Update parent state
        onClose(); // Close modal
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to update student");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update student data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <FormControl>
        <FormLabel>Roll Number</FormLabel>
        <Input
          name="rollNumber"
          value={formData.rollNumber}
          isReadOnly
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Gender</FormLabel>
        <Input
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Address</FormLabel>
        <Input
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </FormControl>
      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
        Save
      </Button>
      <Button mt={4} variant="ghost" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
};

export default EditStudentForm;
