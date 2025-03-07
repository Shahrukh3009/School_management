import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Spinner,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import AddStudentForm from "./AddStudentForm";
import EditStudentForm from "./EditStudentForm";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const { isOpen: isAddStudentOpen, onOpen: onAddStudentOpen, onClose: onAddStudentClose } = useDisclosure();
  const { isOpen: isEditStudentOpen, onOpen: onEditStudentOpen, onClose: onEditStudentClose } = useDisclosure();
  const { isOpen: isDeleteStudentOpen, onOpen: onDeleteStudentOpen, onClose: onDeleteStudentClose } = useDisclosure();
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [searchRollNumber, setSearchRollNumber] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "rollNumber", direction: "ascending" });
  const toast = useToast();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load student data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setStudents((prevStudents) => {
      return [...prevStudents].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
    });
  };

  const handleEdit = (rollNumber) => {
    const student = students.find((s) => s.rollNumber === rollNumber);
    setStudentToEdit(student);
    onEditStudentOpen();  // Open the edit modal when setting the student data
  };

  const openDeleteModal = (rollNumber) => {
    setStudentToDelete(rollNumber);
    onDeleteStudentOpen();
    // setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    // setIsDeleteModalOpen(false);
    setStudentToDelete(null);
    onDeleteStudentClose();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/student/delete/${studentToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      // After deleting, re-fetch the students
      await fetchStudents();
      toast({
        title: "Success",
        description: `Student with Roll Number: ${studentToDelete} deleted successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete student data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      closeDeleteModal(); // Ensure modal closes after the operation
    }
  };

  const handleSearch = () => {
    if (searchRollNumber === "") {
      fetchStudents();
    } else {
      setStudents((prevStudents) =>
        prevStudents.filter((student) =>
          student.rollNumber.toString().includes(searchRollNumber)
        )
      );
    }
  };

//   const closeAddStudentModal = () => {
//     setIsAddStudentOpen(false);
//   };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between" spacing={4}>
          <Input
            placeholder="Search by Roll Number"
            value={searchRollNumber}
            onChange={(e) => setSearchRollNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            w="300px"
          />
          <Button onClick={handleSearch} colorScheme="teal">
            Search
          </Button>
        </HStack>

        <Button
          onClick={onAddStudentOpen}
          colorScheme="teal"
          leftIcon={<AddIcon />}
          size="lg"
        >
          Add Student
        </Button>

        <AddStudentForm
          isOpen={isAddStudentOpen}
          onClose={onAddStudentClose}
          onStudentAdded={(newStudent) => setStudents((prevStudents) => [...prevStudents, newStudent])}
        />

        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th cursor="pointer" onClick={() => handleSort("rollNumber")}>
                Roll Number
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("name")}>
                Name
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("gender")}>
                Gender
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("address")}>
                Address
              </Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr key={student.rollNumber}>
                <Td>{student.rollNumber}</Td>
                <Td>{student.name}</Td>
                <Td>{student.gender}</Td>
                <Td>{student.address}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    variant="outline"
                    mr={2}
                    onClick={() => handleEdit(student.rollNumber)} // Trigger edit modal
                    aria-label="Edit"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    onClick={() => openDeleteModal(student.rollNumber)}
                    aria-label="Delete"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal closeOnOverlayClick={false} isOpen={isEditStudentOpen} onClose={onEditStudentClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Student</ModalHeader>
            <ModalBody>
              <EditStudentForm
                student={studentToEdit}
                onClose={onEditStudentClose}
                onStudentUpdated={(updatedStudent) => {
                  setStudents((prevStudents) =>
                    prevStudents.map((student) =>
                      student.rollNumber === updatedStudent.rollNumber ? updatedStudent : student
                    )
                  );
                }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal closeOnOverlayClick={false} isOpen={isDeleteStudentOpen} onClose={closeDeleteModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalBody>
              Are you sure you want to delete this student?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="ghost" onClick={closeDeleteModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default Home;
