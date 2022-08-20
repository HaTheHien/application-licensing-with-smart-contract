import { Container, Link, Typography } from "@mui/joy";
import { Stack } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useFormContext, useWatch } from "react-hook-form";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderStyle: "dashed",
  borderRadius: "8px",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const EditAppFiles = () => {
  const { control, setValue } = useFormContext();

  const file = useWatch({ control, name: "uploadFile" });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "*/*",
    onDrop: (acceptedFiles) => {
      setValue("uploadFile", acceptedFiles[0]);
    },
  });

  // console.log(file);

  return (
    <Stack py={2} spacing={2}>
      <Typography level="body1" fontWeight="bold">
        Upload app
      </Typography>
      <Container disableGutters>
        <div {...getRootProps({ style: { ...baseStyle } })}>
          <input {...getInputProps()} />

          <Stack direction="row" spacing={1} alignItems="center">
            <CloudUploadOutlinedIcon />
            <Typography>
              {file ? (
                file.name
              ) : (
                <>
                  Drop files to attach, or <Link>Browse</Link>
                </>
              )}
            </Typography>
          </Stack>
        </div>
      </Container>
    </Stack>
  );
};

export default EditAppFiles;
