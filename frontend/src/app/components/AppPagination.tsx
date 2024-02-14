import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
    metaData: MetaData,
    onPageChange: (page: number) => void
}

export default function AppPagination({ metaData, onPageChange }: Props) {
    const { TotalCount, CurrentPage, PageSize, TotalPages } = metaData
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(CurrentPage - 1) * PageSize + 1}
                - {(CurrentPage * PageSize) > TotalCount ? TotalCount : CurrentPage * PageSize}
                of {TotalCount} items
            </Typography>
            <Pagination
                color='secondary'
                size="large"
                count={TotalCount}
                page={CurrentPage} 
                onChange={(e, page) => onPageChange(page)}/>
        </Box>
    )
}