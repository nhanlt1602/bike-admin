import { useHistory } from "react-router";

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
import { HealthCheck } from "src/containers/PatientManagement/models/HealthCheck.model";
import Util from "src/utils/Util";

export interface IConsultationHistory {
    healthChecks?: HealthCheck[];
}

const ConsultationHistory: React.FC<IConsultationHistory> = (props: IConsultationHistory) => {
    const { healthChecks } = props;
    const history = useHistory();

    let healthCheckList = (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 233 }}>
            <Typography sx={{ color: "text.secondary" }}>Chưa có dữ liệu đăng ký tư vấn</Typography>
        </Box>
    );

    return (
        <Card>
            <CardHeader title="Lịch sử đăng ký tư vấn khám chữa bệnh" />
            <Divider />
            <CardContent>
                {healthChecks?.length === 0
                    ? healthCheckList
                    : healthChecks?.map((item, index) => (
                          <Card
                              key={index}
                              variant="outlined"
                              sx={{ display: "flex", flexDirection: "row", pr: 2 }}
                          >
                              <CardContent sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
                                  <Typography component="div" sx={{ mr: 1 }} color="text.secondary">
                                      Bác sĩ tư vấn
                                  </Typography>
                                  <Typography component="div" sx={{ mr: 5 }}>
                                      {item.slots[0].doctor.name}
                                  </Typography>
                                  <Typography component="div" sx={{ mr: 1 }} color="text.secondary">
                                      Ngày đăng kí
                                  </Typography>
                                  <Typography component="div" sx={{ mr: 5 }}>
                                      {Util.convertDate(item.createdTime)}
                                  </Typography>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                      <Chip
                                          label={
                                              item.status === "BOOKED"
                                                  ? "Đã đặt hẹn"
                                                  : item.status === "COMPLETED"
                                                  ? "Hoàn thành"
                                                  : item.status === "CANCELED"
                                                  ? "Đã hủy"
                                                  : "ALL"
                                          }
                                          color={
                                              item.status === "BOOKED"
                                                  ? "primary"
                                                  : item.status === "COMPLETED"
                                                  ? "success"
                                                  : item.status === "CANCELED"
                                                  ? "error"
                                                  : "default"
                                          }
                                          size="small"
                                      />
                                  </Box>
                              </CardContent>
                              <CardActions>
                                  <Button
                                      size="small"
                                      onClick={() => history.push("/health-checks/" + item.id)}
                                  >
                                      Chi tiết
                                  </Button>
                              </CardActions>
                          </Card>
                      ))}
            </CardContent>
            {/* <Divider /> */}
            <CardActions>
                <Button
                    fullWidth
                    variant="text"
                    size="large"
                    disabled={props.healthChecks?.length === 0}
                >
                    Xem thêm
                </Button>
            </CardActions>
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <Button size="small" disabled={props.healthChecks?.length === 0}>
                    Xem thêm...
                </Button>
            </Box> */}
        </Card>
    );
};

export default ConsultationHistory;
