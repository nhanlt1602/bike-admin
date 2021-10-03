import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export interface IConsultationHistory {
    healthChecks?: any[];
}

const ConsultationHistory: React.FC<IConsultationHistory> = (props: IConsultationHistory) => {
    return (
        <Card>
            <CardHeader title="Lịch sử đăng ký tư vấn khám chữa bệnh" />
            <Divider />
            <CardContent>
                {[1, 2, 3, 4].map((item) => (
                    <Card
                        key={item}
                        variant="outlined"
                        sx={{ display: "flex", flexDirection: "row", pr: 2 }}
                    >
                        <CardContent sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
                            <Typography component="div" sx={{ mr: 1 }} color="text.secondary">
                                Bác sĩ tư vấn
                            </Typography>
                            <Typography component="div" sx={{ mr: 5 }}>
                                Nguyễn Trang
                            </Typography>
                            <Typography component="div" sx={{ mr: 1 }} color="text.secondary">
                                Ngày đăng kí
                            </Typography>
                            <Typography component="div" sx={{ mr: 5 }}>
                                01/01/2011
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Chip color="success" label="Hoàn thành" size="small" />
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Chi tiết</Button>
                        </CardActions>
                    </Card>
                ))}
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <Button size="small" disabled={props.healthChecks?.length === 0}>
                    Xem thêm...
                </Button>
            </Box>
        </Card>
    );
};

export default ConsultationHistory;
