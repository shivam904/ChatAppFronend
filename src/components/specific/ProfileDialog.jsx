import { Dialog } from '@mui/material'
import React from 'react'
import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import { useSelector } from 'react-redux';

const ProfileDialog = ({isOpenProfile,setIsOpenProfile}) => {
    const closeHandler = () => {
        setIsOpenProfile(false)
    }
    const { user } = useSelector((state) => state.auth);
  return (
    
    <Dialog open={isOpenProfile} onClose={closeHandler}>
      <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}  width={"22vw"} padding={"1rem"} bgcolor={"rgba(0,0,0,0.85)"} sx={{width:{xs:"25rem"}, bgcolor:"#171717"}}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  </Dialog>
  )
}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {Icon && Icon}
  
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );

export default ProfileDialog
